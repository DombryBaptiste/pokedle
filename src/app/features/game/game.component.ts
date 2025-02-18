import { Component, OnInit } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../models/pokemon';
import { map, Observable, startWith } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PokemonDetails } from '../../models/pokemon-detail';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';


@Component({
  selector: 'app-game',
  imports: [MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatInputModule, MatIconModule, MatButtonModule, PokemonDetailComponent, JsonPipe],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  listPokemon: Pokemon[] = [];
  filteredListPokemon: Observable<Pokemon[]> | undefined;

  listPokemonSelected: PokemonDetails[] = [];

  pokemonControl = new FormControl();

  constructor(public readonly pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList(1, 151).subscribe({
      next: (data) => {
        this.listPokemon = data;
      }
    });
    this.filteredListPokemon = this.pokemonControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterPokemons(value))
    )
  }

  onPokemonSelected(event: MatAutocompleteSelectedEvent) {
    const pokemonSelected = this.listPokemon.find(pokemon => pokemon.name == event.option.value);
    if(!pokemonSelected) {
      throw new Error('Le pokémon est introuvable');
    }
    this.pokemonService.getPokemonById(pokemonSelected.id).subscribe({
      next: (pokemon: PokemonDetails) => {
        this.listPokemonSelected.push(pokemon);
        this.pokemonControl.reset();
      }
    });
    this.listPokemon = this.listPokemon.filter(pokemon => pokemon.id !== pokemonSelected.id);
  }

  private filterPokemons(value: string): Pokemon[] {
    if (!value) {
      return [];
    }
    const normalizeText = (text: string) =>
      text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const filterValue = normalizeText(value);

    return this.listPokemon.filter(pokemon => normalizeText(pokemon.name).startsWith(filterValue));
  }
}
