import { Component, OnInit } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../models/pokemon';
import { map, Observable, startWith } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-game',
  imports: [MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  listPokemon: Pokemon[] = [];
  filteredListPokemon: Observable<Pokemon[]> | undefined;

  pokemonControl = new FormControl();

  constructor(private readonly pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe({
      next: (data) => {
        this.listPokemon = data;
      }
    });
    this.filteredListPokemon = this.pokemonControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterPokemons(value))
    )
  }

  onPokemonSelected(event: MatAutocompleteSelectedEvent | MouseEvent) {
    console.log(event);
  }

  private filterPokemons(value: string): Pokemon[] {
    const filterValue = value.toLowerCase();
    return this.listPokemon.filter(pokemon => pokemon.name.toLowerCase().startsWith(filterValue));
  }
}
