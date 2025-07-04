import type { PokemonData } from './types/PokemonData';
import Pokemon from './Pokemon.js';
import { moveData } from './data/moveData.js';
import { Move } from './Move.js';
import { typeChart } from './data/typeChart.js';
import Logger from './Logger';

type Player = 'player' | 'opponent';

export default class BattleEngine {
  public playerTeam: Pokemon[];
  public playerActivePokemon: Pokemon;
  public opponentTeam: Pokemon[];
  public opponentActivePokemon: Pokemon;

  constructor(playerTeamData: PokemonData[], opponentTeamData: PokemonData[]) {
    this.playerTeam = playerTeamData.map((data) => new Pokemon(data));
    this.playerActivePokemon = this.playerTeam[0];
    this.opponentTeam = opponentTeamData.map((data) => new Pokemon(data));
    this.opponentActivePokemon = this.opponentTeam[0];
  }

  selectMove(
    playerMoveIndex: number | undefined,
  ): 'Pokemon Select' | 'Player Win' | 'Opponent Win' | undefined {
    const playerMove =
      playerMoveIndex === undefined
        ? undefined
        : playerMoveIndex >= 0
          ? this.playerActivePokemon.moves[playerMoveIndex]
          : structuredClone(moveData.Struggle);
    const opponentMove = this.selectOpponentMove();
    const firstPlayer = this.calculateFirstPlayer(
      this.playerActivePokemon,
      playerMove,
      this.opponentActivePokemon,
      opponentMove,
    );
    const [firstPokemon, secondPokemon, firstMove, secondMove] =
      firstPlayer === 'player'
        ? [
            this.playerActivePokemon,
            this.opponentActivePokemon,
            playerMove,
            opponentMove,
          ]
        : [
            this.opponentActivePokemon,
            this.playerActivePokemon,
            opponentMove,
            playerMove,
          ];

    // Helper to check win/lose/switch after a move
    const checkBattleState = ():
      | 'Pokemon Select'
      | 'Player Win'
      | 'Opponent Win'
      | undefined => {
      if (this.opponentActivePokemon.hp <= 0) {
        this.opponentActivePokemon = this.selectOpponentPokemon();
        if (this.opponentActivePokemon.hp <= 0) return 'Player Win';
        return undefined;
      }
      if (this.playerActivePokemon.hp <= 0) {
        if (this.playerTeam.some((pokemon) => pokemon.hp))
          return 'Pokemon Select';
        return 'Opponent Win';
      }
      return undefined;
    };

    this.useMove(firstPokemon, secondPokemon, firstMove);
    const result = checkBattleState();
    if (result) return result;

    this.useMove(secondPokemon, firstPokemon, secondMove);
    return checkBattleState();
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
    playerMove: Move | undefined,
    opponentActivePokemon: Pokemon,
    opponentMove: Move,
  ): Player {
    if (playerMove === undefined) return 'opponent';
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
    move: Move | undefined,
  ): void {
    if (move === undefined) return;
    Logger.log(
      `${attackingPokemon.name} used ${move.name} on ${defendingPokemon.name}!`,
    );
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

    const damage = Math.floor(
      ((((2 * 100) / 5 + 2) * move.power * attack) / defense / 50 + 2) *
        modifier,
    );

    defendingPokemon.hp = Math.max(0, defendingPokemon.hp - damage);

    Logger.log(`${move.name} dealt ${damage} damage!`);

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

      function logStatChange(): void {
        Logger.log(
          `${affectedPokemon} had their ${effect.condition} ${effect.strength > 0 ? 'increased' : 'decreased'}${Math.abs(effect.strength) >= 2 ? ' sharply' : ''}!`,
        );
      }

      switch (effect.condition) {
        case 'attack':
          affectedPokemon.attackStage = boundedValue(
            affectedPokemon.attackStage + effect.strength,
          );
          logStatChange();
          break;
        case 'defense':
          affectedPokemon.defenseStage = boundedValue(
            affectedPokemon.defenseStage + effect.strength,
          );
          logStatChange();
          break;
        case 'special':
          affectedPokemon.specialStage = boundedValue(
            affectedPokemon.specialStage + effect.strength,
          );
          logStatChange();
          break;
        case 'speed':
          affectedPokemon.speedStage = boundedValue(
            affectedPokemon.speedStage + effect.strength,
          );
          logStatChange();
          break;
        case 'accuracy':
          affectedPokemon.accuracyStage = boundedValue(
            affectedPokemon.accuracyStage + effect.strength,
          );
          logStatChange();
          break;
        case 'evasion':
          affectedPokemon.evasionStage = boundedValue(
            affectedPokemon.evasionStage + effect.strength,
          );
          logStatChange();
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

  private selectOpponentPokemon(): Pokemon {
    const opponentValidPokemon = this.opponentTeam.filter(
      (pokemon) => pokemon.hp >= 0,
    );
    const opponentValidPokemonTotal = opponentValidPokemon.length;
    const opponentPokemonIndex = opponentValidPokemonTotal
      ? Math.floor(Math.random() * opponentValidPokemonTotal)
      : -1;
    return opponentPokemonIndex >= 0
      ? this.opponentTeam[opponentPokemonIndex]
      : this.opponentTeam[0];
  }
}
