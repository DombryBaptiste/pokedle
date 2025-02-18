import { Component, OnInit } from '@angular/core';
import { PokemonService } from './core/services/pokemon.service';
import { GameComponent } from './features/game/game.component';

@Component({
  selector: 'app-root',
  imports: [GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pokedle';

  isLoading: boolean = true;

  constructor(
    private readonly pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.pokemonService.initPokemonToGuess(1, 151).subscribe({
      next: () => this.isLoading = false
    });
  }
}
