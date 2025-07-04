import type { Type } from '../data/typeChart.js';

export interface PokemonData {
  name: string;
  types: Type[];
  hp: number;
  attack: number;
  defense: number;
  special: number;
  speed: number;
  moves: string[];
}
