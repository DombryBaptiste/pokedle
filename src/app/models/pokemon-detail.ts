import { PokemonType } from "./pokemon-type";

export interface PokemonDetails {
  name: string;
  id: number;
  types: PokemonType[];
  weight: number;
  color: string;
  location: string;
  evolutionStage: number;
}
