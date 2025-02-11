import { Component, OnInit } from '@angular/core';
import { PokemonService } from './core/services/pokemon.service';
import { UtilsService } from './core/services/utils.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pokedle';

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.initPokemon();
  }

  initPokemon(): void {
    this.pokemonService.setPokemonNumber(this.utilsService.getRandomNumber(1, 151));
    this.pokemonService.getPokemonById(this.pokemonService.getPokemonNumber()).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error('Erreur lors de la récupération du pokemon'),
    })
    console.log(this.pokemonService.getPokemonNumber());
  }
}
