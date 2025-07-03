import { PokemonData } from './types/PokemonData';

export default class Pokemon {
  public name;
  public types;
  public baseHP;
  public baseAttack;
  public baseDefense;
  public baseSpeed;
  public baseSpecial;
  public moves;

  public hp;
  public attack;
  public defense;
  public special;
  public speed;
  public accuracy;
  public evasion;

  constructor(pokemonData: PokemonData) {
    this.name = pokemonData.name;
    this.types = pokemonData.types;
    this.baseHP = pokemonData.hp;
    this.baseAttack = pokemonData.attack;
    this.baseDefense = pokemonData.defense;
    this.baseSpecial = pokemonData.special;
    this.baseSpeed = pokemonData.speed;
    this.moves = pokemonData.moves;

    this.hp = this.baseHP;
    this.attack = this.baseAttack;
    this.defense = this.baseDefense;
    this.special = this.baseSpecial;
    this.speed = this.baseSpeed;
    this.accuracy = 1;
    this.evasion = 1;
  }

  log(): void {
    console.log(
      this.name,
      this.types,
      this.baseHP,
      this.baseAttack,
      this.baseDefense,
      this.baseSpeed,
      this.baseSpecial,
      this.moves,
    );
  }
}
