import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly pokemonNumber = signal(0);

  constructor(private readonly http: HttpClient) { }

  getPokemonNumber(): number {
    return this.pokemonNumber();
  }

  setPokemonNumber(number: number): void {
    this.pokemonNumber.set(number);
  }

  getPokemonById(id: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
