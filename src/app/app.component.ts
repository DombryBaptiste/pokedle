import { Component, OnInit } from '@angular/core';
import { PokemonService } from './core/services/pokemon.service';
import { UtilsService } from './core/services/utils.service';
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
    private readonly utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.pokemonService.initPokemonToGuess(1, 151).subscribe({
      next: () => this.isLoading = false
    });
  }
}
