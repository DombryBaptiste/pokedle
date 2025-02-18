import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { PokemonDetails } from '../../models/pokemon-detail';
import { PokemonService } from '../../core/services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
})
export class PokemonDetailComponent implements OnInit {

  @Input() pokemon!: PokemonDetails;
  pokemonToGuess!: WritableSignal<PokemonDetails>;

  constructor(private readonly pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonToGuess = this.pokemonService.getPokemonToGuess();
  }

  getArrowClass(key: keyof PokemonDetails): string {
    if(this.pokemon[key] > this.pokemonToGuess()[key]) {
      return "down";
    } else if(this.pokemon[key] < this.pokemonToGuess()[key]) {
      return "up";
    }
    return "";
  }

  getColor(key: keyof PokemonDetails): string {
    if(this.pokemon[key] === this.pokemonToGuess()[key]) {
      return "green"
    } else {
      return "red"
    }
  }
}
