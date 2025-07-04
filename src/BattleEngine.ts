import type { PokemonData } from './types/PokemonData';
import Pokemon from './Pokemon.js';
import { moveData } from './data/moveData.js';
import { Move } from './Move.js';

type Player = 'player' | 'opponent';

export default class BattleEngine {
  public playerTeam: Pokemon[];
  public playerActiveSlot: number;
  public playerActivePokemon: Pokemon;
  public opponentTeam: Pokemon[];
  public opponentActiveSlot: number;
  public opponentActivePokemon: Pokemon;

  constructor(playerTeamData: PokemonData[], opponentTeamData: PokemonData[]) {
    this.playerTeam = playerTeamData.map((data) => new Pokemon(data));
    this.playerActiveSlot = 0;
    this.playerActivePokemon = this.playerTeam[0];
    this.opponentTeam = opponentTeamData.map((data) => new Pokemon(data));
    this.opponentActiveSlot = 0;
    this.opponentActivePokemon = this.opponentTeam[0];
  }

  selectMove(playerMoveIndex: number): void {
    const playerMove =
      playerMoveIndex >= 0
        ? this.playerActivePokemon.moves[playerMoveIndex]
        : structuredClone(moveData.Struggle);

    const opponentMove = this.selectOpponentMove();

    const firstPlayer = this.calculateFirstPlayer(
      this.playerActivePokemon,
      playerMove,
      this.opponentActivePokemon,
      opponentMove,
    );

    if (firstPlayer === 'player') {
      this.useMove(
        this.playerActivePokemon,
        this.opponentActivePokemon,
        playerMove,
      );
    } else {
      this.useMove(
        this.opponentActivePokemon,
        this.playerActivePokemon,
        opponentMove,
      );
    }
  }

  log(): void {
    console.log(
      this.playerTeam,
      this.playerActiveSlot,
      this.playerActivePokemon,
      this.opponentTeam,
      this.opponentActiveSlot,
      this.opponentActivePokemon,
    );
  }

  private selectOpponentMove(): Move {
    const opponentValidMoves = this.opponentActivePokemon.moves.filter(
      (move) => move.pp,
    );
    const opponentValidMovesTotal = opponentValidMoves.length;
    const opponentMoveIndex = opponentValidMovesTotal
      ? Math.floor(Math.random() * opponentValidMovesTotal)
      : -1;
    return opponentMoveIndex >= 0
      ? this.opponentActivePokemon.moves[opponentMoveIndex]
      : structuredClone(moveData.Struggle);
  }

  private calculateFirstPlayer(
    playerActivePokemon: Pokemon,
    playerMove: Move,
    opponentActivePokemon: Pokemon,
    opponentMove: Move,
  ): Player {
    if (playerMove.priority > opponentMove.priority) return 'player';
    if (playerMove.priority < opponentMove.priority) return 'opponent';
    if (playerActivePokemon.speed > opponentActivePokemon.speed)
      return 'player';
    if (playerActivePokemon.speed < opponentActivePokemon.speed)
      return 'opponent';

    if (Math.random() > 0.5) return 'player';
    return 'opponent';
  }

  private useMove(
    attackingPokemon: Pokemon,
    defendingPokemon: Pokemon,
    move: Move,
  ): void {
    const attack =
      move.category === 'physical'
        ? attackingPokemon.attack
        : attackingPokemon.special;
    const defense =
      move.category === 'physical'
        ? defendingPokemon.defense
        : defendingPokemon.special;

    let modifier = 1;
    if (attackingPokemon.types.includes(move.type)) {
      modifier *= 1.5;
    }

    const typeChart: Record<string, Record<string, number>> = {
      normal: { rock: 0.5, ghost: 0 },
      fire: {
        fire: 0.5,
        water: 0.5,
        grass: 2,
        ice: 2,
        bug: 2,
        rock: 0.5,
        dragon: 0.5,
      },
      water: {
        fire: 2,
        water: 0.5,
        grass: 0.5,
        ground: 2,
        rock: 2,
        dragon: 0.5,
      },
      electric: {
        water: 2,
        electric: 0.5,
        grass: 0.5,
        ground: 0,
        flying: 2,
        dragon: 0.5,
      },
      grass: {
        fire: 0.5,
        water: 2,
        grass: 0.5,
        poison: 0.5,
        ground: 2,
        flying: 0.5,
        bug: 0.5,
        rock: 2,
        dragon: 0.5,
      },
      ice: {
        fire: 0.5,
        water: 0.5,
        grass: 2,
        ice: 0.5,
        ground: 2,
        flying: 2,
        dragon: 2,
      },
      fighting: {
        normal: 2,
        ice: 2,
        rock: 2,
        ghost: 0,
        poison: 0.5,
        flying: 0.5,
        psychic: 0.5,
        bug: 0.5,
      },
      poison: {
        grass: 2,
        poison: 0.5,
        ground: 0.5,
        bug: 2,
        rock: 0.5,
        ghost: 0.5,
      },
      ground: {
        fire: 2,
        electric: 2,
        grass: 0.5,
        poison: 2,
        flying: 0,
        bug: 0.5,
        rock: 2,
      },
      flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5 },
      psychic: { fighting: 2, poison: 2, psychic: 0.5 },
      bug: {
        fire: 0.5,
        grass: 2,
        fighting: 0.5,
        poison: 2,
        flying: 0.5,
        ghost: 0.5,
      },
      rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2 },
      ghost: { normal: 0, psychic: 0 },
      dragon: { dragon: 2 },
    };

    for (const defType of defendingPokemon.types) {
      const chart = typeChart[move.type];
      if (chart && chart[defType] !== undefined) {
        modifier *= chart[defType];
      }
    }

    modifier *= (Math.random() * 38 + 217) / 255;

    const critChance = (attackingPokemon.baseSpeed * move.critRatio) / 512;
    if (Math.random() <= critChance) {
      modifier *= 2;
    }

    const damage =
      ((((2 * 100) / 5 + 2) * move.power * attack) / defense / 50 + 2) *
      modifier;

    defendingPokemon.hp = Math.max(0, defendingPokemon.hp - damage);

    if (move.effect && Math.random() <= move.effect.chance) {
      const effect = move.effect;
      const affectedPokemon =
        effect.affects === 'self' ? attackingPokemon : defendingPokemon;

      function boundedValue(stage: number): number {
        return Math.max(-6, Math.min(6, stage));
      }

      function isAffectedByStatus(pokemon: Pokemon): boolean {
        return (
          !!pokemon.badlyPoisonedStage ||
          !!pokemon.sleepStage ||
          pokemon.isBurned ||
          pokemon.isFrozen ||
          pokemon.isParalyzed ||
          pokemon.isPoisoned
        );
      }

      switch (effect.condition) {
        case 'attack':
          affectedPokemon.attackStage = boundedValue(
            affectedPokemon.attackStage + effect.strength,
          );
          break;
        case 'defense':
          affectedPokemon.defenseStage = boundedValue(
            affectedPokemon.defenseStage + effect.strength,
          );
          break;
        case 'special':
          affectedPokemon.specialStage = boundedValue(
            affectedPokemon.specialStage + effect.strength,
          );
          break;
        case 'speed':
          affectedPokemon.speedStage = boundedValue(
            affectedPokemon.speedStage + effect.strength,
          );
          break;
        case 'accuracy':
          affectedPokemon.accuracyStage = boundedValue(
            affectedPokemon.accuracyStage + effect.strength,
          );
          break;
        case 'evasion':
          affectedPokemon.evasionStage = boundedValue(
            affectedPokemon.evasionStage + effect.strength,
          );
          break;
        case 'burn':
          if (!isAffectedByStatus(affectedPokemon)) {
            affectedPokemon.isBurned = true;
          }
          break;
        case 'freeze':
          if (!isAffectedByStatus(affectedPokemon)) {
            affectedPokemon.isFrozen = true;
          }
          break;
        case 'paralysis':
          if (!isAffectedByStatus(affectedPokemon)) {
            affectedPokemon.isParalyzed = true;
          }
          break;
        case 'poison':
          if (!isAffectedByStatus(affectedPokemon)) {
            affectedPokemon.isPoisoned = true;
          }
          break;
        case 'badlypoisoned':
          if (!isAffectedByStatus(affectedPokemon)) {
            affectedPokemon.badlyPoisonedStage++;
          }
          break;
        case 'sleep':
          if (!isAffectedByStatus(affectedPokemon)) {
            affectedPokemon.sleepStage = Math.floor(Math.random() * 3) + 1;
          }
          break;
        case 'flinch':
          affectedPokemon.isFlinched = true;
          break;
        case 'drain':
          affectedPokemon.hp = Math.min(
            affectedPokemon.baseHP,
            affectedPokemon.hp + damage * effect.strength,
          );
          break;
        case 'recoil':
          affectedPokemon.hp = Math.max(
            0,
            affectedPokemon.hp - damage * effect.strength,
          );
          break;
      }
    }
  }
}
