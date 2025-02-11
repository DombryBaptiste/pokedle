import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly jsonUrl = '/assets/pokemons.json'

  private readonly pokemonNumber = signal(0);

  constructor(private readonly http: HttpClient) { }

  getPokemonNumber(): number {
    return this.pokemonNumber();
  }

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.jsonUrl);
  }

  setPokemonNumber(number: number): void {
    this.pokemonNumber.set(number);
  }

  getPokemonById(id: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
