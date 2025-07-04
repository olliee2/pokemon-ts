import { PokemonData } from './types/PokemonData';
import { moveData } from './data/moveData.js';

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
  public accuracy = 1;
  public evasion = 1;

  public attackStage = 0;
  public defenseStage = 0;
  public specialStage = 0;
  public speedStage = 0;
  public accuracyStage = 0;
  public evasionStage = 0;
  public badlyPoisonedStage = 0;
  public sleepStage = 0;

  public isBurned = false;
  public isFrozen = false;
  public isParalyzed = false;
  public isPoisoned = false;
  public isFlinched = false;

  constructor(pokemonData: PokemonData) {
    this.name = pokemonData.name;
    this.types = pokemonData.types;
    this.baseHP = pokemonData.hp;
    this.baseAttack = pokemonData.attack;
    this.baseDefense = pokemonData.defense;
    this.baseSpecial = pokemonData.special;
    this.baseSpeed = pokemonData.speed;
    this.moves = pokemonData.moves.map((move) =>
      structuredClone(moveData[move]),
    );

    this.hp = this.baseHP;
    this.attack = this.baseAttack;
    this.defense = this.baseDefense;
    this.special = this.baseSpecial;
    this.speed = this.baseSpeed;
  }

  log(): void {
    console.log(this);
  }
}
