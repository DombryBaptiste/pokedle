import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { PokemonDetails } from '../../models/pokemon-detail';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly jsonUrl = '/assets/pokedex.json'
  private readonly pokeAPIBaseUrl = "https://pokeapi.co/api/v2"

  private readonly pokemonToGuess: WritableSignal<PokemonDetails> = signal({} as PokemonDetails);

  constructor(private readonly http: HttpClient, private readonly utilsService: UtilsService) { }

  getPokemonList(min: number, max: number): Observable<Pokemon[]> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
      map((pokemons) => {
        return pokemons
          .filter(pokemon => pokemon.id >= min && pokemon.id <= max)
          .map(pokemon => ({
            id: pokemon.id,
            name: pokemon.name.french
          }));
      })
    );
  }


  getPokemonToGuess(): WritableSignal<PokemonDetails> {
    return this.pokemonToGuess;
  }

  setPokemonToGuess(pokemon: PokemonDetails): void {
    this.pokemonToGuess.set(pokemon);
  }

  initPokemonToGuess(min: number, max: number): Observable<Pokemon> {
    return this.getPokemonById(this.utilsService.getRandomNumber(min, max)).pipe(
      tap((data) => {
        this.setPokemonToGuess(data);
      })
    );
  }

  /**
   * Récupère tous les détails d'un Pokémon à partir de son id, en utilisant l'API de PokeAPI.
   *
   * Cette fonction effectue deux appels API :
   * 1. Un appel à `pokemon-species` pour obtenir des informations générales sur l'espèce du Pokémon.
   * 2. Un appel à `pokemon` pour obtenir des informations spécifiques au Pokémon (comme les types, le poids, etc.).
   * Ensuite, elle effectue un troisième appel à `evolution_chain` pour déterminer le stade d'évolution du Pokémon en utilisant la chaîne d'évolution.
   *
   * Elle combine les réponses des trois appels pour renvoyer un objet contenant tous les détails nécessaires sur le Pokémon.
   *
   * @param {number} id - L'ID du Pokémon selon le Pokédex. Cet ID est utilisé pour récupérer les informations de base du Pokémon et de son espèce.
   *
   * @returns {Observable<PokemonDetails>} Un Observable qui émet un objet `PokemonDetails` contenant les informations complètes du Pokémon,
   * y compris son id, son nom, ses types, son poids, sa couleur, son habitat, et son stade d'évolution.
   *
   * Exemple de résultat retourné :
   * ```json
   * {
   *   "id": 1,
   *   "name": "bulbasaur",
   *   "types": [
   *     { "slot": 1, "name": "grass" },
   *     { "slot": 2, "name": "poison" }
   *   ],
   *   "weight": 6.9,
   *   "color": "Vert",
   *   "location": "Champs",
   *   "evolutionStage": 1
   *   "image":
   * }
   * ```
  */
  getPokemonById(id: number): Observable<PokemonDetails> {
    const species$ = this.http.get<any>(`${this.pokeAPIBaseUrl}/pokemon-species/${id}`);
    const details$ = this.http.get<any>(`${this.pokeAPIBaseUrl}/pokemon/${id}`);

    return forkJoin([species$, details$]).pipe(
      switchMap(([species, details]) => {
        const evolutionChainUrl = species.evolution_chain.url;
        return this.http.get<any>(evolutionChainUrl).pipe(
          map(evolutionChain => {
            const evolutionStage = this.getEvolutionStage(evolutionChain, details.name);

            return {
              id: details.id,
              name: species.names.find((name: any) => name.language.name === 'fr').name,
              types: details.types.map((t: any) => ({
                slot: t.slot,
                name: this.utilsService.translateType(t.type.name)
              })),
              weight: details.weight / 10,
              height: details.height / 10,
              color: this.utilsService.translateColor(species.color.name),
              location: this.utilsService.translateHabitat(species.habitat.name),
              evolutionStage: evolutionStage,
              image: details.sprites.front_default
            };
          })
        );
      })
    );
  }

  /**
   * Calcul le stade d'évolution d'un Pokémon dans la chaine d'évolution.
   *
   * @param {any} evolutionChain - La chaine d'évolution du Pokemon.
   * @param pokemonName - Le nom du Pokémon actuel.
   * @returns {number} Le stade d'évolution du Pokémon.
   */
  private getEvolutionStage(evolutionChain: any, pokemonName: string): number {
    let currentStage = 1;
    let evolutionDetails = evolutionChain.chain;

    while(evolutionDetails) {
      if (evolutionDetails.species.name === pokemonName) {
        return currentStage;
      }
      evolutionDetails = evolutionDetails.evolves_to[0];
      currentStage++
    }

    return 0;
  }
}
