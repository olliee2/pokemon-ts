import Pokemon from './Pokemon.js';
import { moveData } from './data/moveData.js';
import { typeChart } from './data/typeChart.js';
import Logger from './Logger.js';
export default class BattleEngine {
    constructor(playerTeamData, opponentTeamData) {
        this.playerTeam = playerTeamData.map((data) => new Pokemon(data));
        this.playerActivePokemon = this.playerTeam[0];
        this.opponentTeam = opponentTeamData.map((data) => new Pokemon(data));
        this.opponentActivePokemon = this.opponentTeam[0];
    }
    selectMove(playerMoveIndex) {
        const playerMove = playerMoveIndex === undefined
            ? undefined
            : playerMoveIndex >= 0
                ? this.playerActivePokemon.moves[playerMoveIndex]
                : structuredClone(moveData.Struggle);
        const opponentMove = this.selectOpponentMove();
        const firstPlayer = this.calculateFirstPlayer(this.playerActivePokemon, playerMove, this.opponentActivePokemon, opponentMove);
        const [firstPokemon, secondPokemon, firstMove, secondMove] = firstPlayer === 'player'
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
        Logger.newTurn();
        this.useMove(firstPokemon, secondPokemon, firstMove);
        if (secondPokemon.hp > 0) {
            this.useMove(secondPokemon, firstPokemon, secondMove);
        }
        this.handleTurnEnd();
        return this.checkBattleState();
    }
    handleTurnEnd() {
        [this.playerActivePokemon, this.opponentActivePokemon].forEach((pokemon) => {
            if (pokemon.isBurned) {
                pokemon.hp -= Math.floor(Math.max(1, Math.floor(pokemon.baseHP / 16)));
            }
            if (pokemon.isPoisoned) {
                pokemon.hp -= Math.floor(Math.max(1, Math.floor(pokemon.baseHP / 16)));
            }
            if (pokemon.badlyPoisonedStage) {
                pokemon.hp -= Math.floor(Math.max(1, (Math.floor(pokemon.baseHP) * pokemon.badlyPoisonedStage) / 16));
                pokemon.badlyPoisonedStage++;
            }
        });
    }
    checkBattleState() {
        if (this.opponentActivePokemon.hp <= 0) {
            this.opponentActivePokemon.hp = 0;
            Logger.log(`The opponent's ${this.opponentActivePokemon.name} fainted!`);
            const opponentValidPokemon = this.opponentTeam.filter((pokemon) => pokemon.hp > 0);
            if (opponentValidPokemon.length === 0) {
                Logger.log('The opponent ran out of Pokémon.');
                Logger.log('You win!');
                return 'Player Win';
            }
            this.opponentActivePokemon =
                opponentValidPokemon[Math.floor(Math.random() * opponentValidPokemon.length)];
            Logger.log(`The opponent sent out ${this.opponentActivePokemon.name}!`);
            return undefined;
        }
        if (this.playerActivePokemon.hp <= 0) {
            this.playerActivePokemon.hp = 0;
            Logger.log(`Your ${this.playerActivePokemon.name} fainted!`);
            if (this.playerTeam.some((pokemon) => pokemon.hp > 0)) {
                Logger.log('Choose a new Pokémon to send out.');
                return 'Pokemon Select';
            }
            Logger.log('You ran out of Pokémon.');
            Logger.log('The opponent won!');
            return 'Opponent Win';
        }
        return undefined;
    }
    switchPokemon(pokemonIndex) {
        const selectedPokemon = this.playerTeam[pokemonIndex];
        if (selectedPokemon.hp > 0 &&
            selectedPokemon !== this.playerActivePokemon) {
            this.playerActivePokemon = selectedPokemon;
            Logger.log(`You sent out ${selectedPokemon.name}!`);
        }
    }
    calculateFirstPlayer(playerActivePokemon, playerMove, opponentActivePokemon, opponentMove) {
        if (playerMove === undefined)
            return 'opponent';
        if (playerMove.priority > opponentMove.priority)
            return 'player';
        if (playerMove.priority < opponentMove.priority)
            return 'opponent';
        if (playerActivePokemon.speed > opponentActivePokemon.speed)
            return 'player';
        if (playerActivePokemon.speed < opponentActivePokemon.speed)
            return 'opponent';
        if (Math.random() > 0.5)
            return 'player';
        return 'opponent';
    }
    selectOpponentPokemon() {
        const opponentValidPokemon = this.opponentTeam.filter((pokemon) => pokemon.hp > 0);
        const opponentValidPokemonTotal = opponentValidPokemon.length;
        const opponentPokemonIndex = opponentValidPokemonTotal
            ? Math.floor(Math.random() * opponentValidPokemonTotal)
            : -1;
        return opponentPokemonIndex >= 0
            ? this.opponentTeam[opponentPokemonIndex]
            : this.opponentTeam[0];
    }
    selectOpponentMove() {
        const opponentValidMoves = this.opponentActivePokemon.moves.filter((move) => move.pp);
        const opponentValidMovesTotal = opponentValidMoves.length;
        const opponentMoveIndex = opponentValidMovesTotal
            ? Math.floor(Math.random() * opponentValidMovesTotal)
            : -1;
        return opponentMoveIndex >= 0
            ? this.opponentActivePokemon.moves[opponentMoveIndex]
            : structuredClone(moveData.Struggle);
    }
    useMove(attackingPokemon, defendingPokemon, move) {
        if (move === undefined)
            return;
        this.synchronizeStats();
        if (move.pp <= 0) {
            Logger.log(`${attackingPokemon.name} tried to use ${move.name}, but it has no PP left!`);
            return;
        }
        move.pp -= 1;
        if (attackingPokemon.isFrozen) {
            Logger.log(`${attackingPokemon.name} is frozen!`);
            return;
        }
        if (attackingPokemon.sleepStage) {
            Logger.log(`${attackingPokemon.name} is fast asleep!`);
            return;
        }
        if (attackingPokemon.isParalyzed && Math.random() < 0.25) {
            Logger.log(`${attackingPokemon.name} is paralyzed and cannot move!`);
            return;
        }
        Logger.log(`${attackingPokemon.name} used ${move.name} on ${defendingPokemon.name}!`);
        const hitChance = (move.accuracy * attackingPokemon.accuracy) / defendingPokemon.evasion;
        if (Math.random() > hitChance) {
            Logger.log('But it missed!');
            return;
        }
        const attack = move.category === 'physical'
            ? attackingPokemon.attack
            : attackingPokemon.special;
        const defense = move.category === 'physical'
            ? defendingPokemon.defense
            : defendingPokemon.special;
        let modifier = 1;
        if (attackingPokemon.types.includes(move.type)) {
            modifier *= 1.5;
        }
        let typeEffectiveness = 1;
        for (const defType of defendingPokemon.types) {
            const chart = typeChart[move.type];
            if (chart && chart[defType] !== undefined) {
                typeEffectiveness *= chart[defType];
            }
        }
        switch (typeEffectiveness) {
            case 4:
                Logger.log(`It's extremely effective!`);
                break;
            case 2:
                Logger.log(`It's super effective!`);
                break;
            case 0.5:
                Logger.log(`It's not very effective...`);
                break;
            case 0.25:
                Logger.log(`It's barely effective...`);
                break;
            case 0:
                Logger.log(`It had no effect`);
                break;
        }
        modifier *= typeEffectiveness;
        modifier *= (Math.random() * 38 + 217) / 255;
        const critChance = (attackingPokemon.baseSpeed * move.critRatio) / 512;
        if (Math.random() <= critChance) {
            modifier *= 2;
        }
        const damage = Math.floor(((42 * move.power * attack) / defense / 50 + 2) * modifier);
        const originalHP = defendingPokemon.hp;
        defendingPokemon.hp = Math.max(0, defendingPokemon.hp - damage);
        Logger.log(`${move.name} dealt ${originalHP - defendingPokemon.hp} damage!`);
        if (move.effect && Math.random() <= move.effect.chance) {
            const effect = move.effect;
            const affectedPokemon = effect.affects === 'self' ? attackingPokemon : defendingPokemon;
            function boundedValue(stage) {
                return Math.max(-6, Math.min(6, stage));
            }
            function isAffectedByStatus(pokemon) {
                return (!!pokemon.badlyPoisonedStage ||
                    !!pokemon.sleepStage ||
                    pokemon.isBurned ||
                    pokemon.isFrozen ||
                    pokemon.isParalyzed ||
                    pokemon.isPoisoned);
            }
            function logStatChange() {
                Logger.log(`${affectedPokemon.name} had their ${effect.condition} ${effect.strength > 0 ? 'increased' : 'decreased'}${Math.abs(effect.strength) >= 2 ? ' sharply' : ''}!`);
            }
            switch (effect.condition) {
                case 'attack':
                    affectedPokemon.attackStage = boundedValue(affectedPokemon.attackStage + effect.strength);
                    logStatChange();
                    break;
                case 'defense':
                    affectedPokemon.defenseStage = boundedValue(affectedPokemon.defenseStage + effect.strength);
                    logStatChange();
                    break;
                case 'special':
                    affectedPokemon.specialStage = boundedValue(affectedPokemon.specialStage + effect.strength);
                    logStatChange();
                    break;
                case 'speed':
                    affectedPokemon.speedStage = boundedValue(affectedPokemon.speedStage + effect.strength);
                    logStatChange();
                    break;
                case 'accuracy':
                    affectedPokemon.accuracyStage = boundedValue(affectedPokemon.accuracyStage + effect.strength);
                    logStatChange();
                    break;
                case 'evasion':
                    affectedPokemon.evasionStage = boundedValue(affectedPokemon.evasionStage + effect.strength);
                    logStatChange();
                    break;
                case 'burn':
                    if (!isAffectedByStatus(affectedPokemon)) {
                        affectedPokemon.isBurned = true;
                        Logger.log(`${affectedPokemon.name} has been burned!`);
                    }
                    break;
                case 'freeze':
                    if (!isAffectedByStatus(affectedPokemon)) {
                        affectedPokemon.isFrozen = true;
                        Logger.log(`${affectedPokemon.name} has been frozen!`);
                    }
                    break;
                case 'paralysis':
                    if (!isAffectedByStatus(affectedPokemon)) {
                        affectedPokemon.isParalyzed = true;
                        Logger.log(`${affectedPokemon.name} has been paralyzed!`);
                    }
                    break;
                case 'poison':
                    if (!isAffectedByStatus(affectedPokemon)) {
                        affectedPokemon.isPoisoned = true;
                        Logger.log(`${affectedPokemon.name} has been poisoned!`);
                    }
                    break;
                case 'badlypoisoned':
                    if (!isAffectedByStatus(affectedPokemon)) {
                        affectedPokemon.badlyPoisonedStage = 1;
                        Logger.log(`${affectedPokemon.name} has been badly poisoned!`);
                    }
                    break;
                case 'sleep':
                    if (!isAffectedByStatus(affectedPokemon)) {
                        affectedPokemon.sleepStage = Math.floor(Math.random() * 3) + 1;
                        Logger.log(`${affectedPokemon.name} has been put to sleep!`);
                    }
                    break;
                case 'flinch':
                    affectedPokemon.isFlinched = true;
                    break;
                case 'drain': {
                    const originalHP = affectedPokemon.hp;
                    affectedPokemon.hp = Math.floor(Math.min(affectedPokemon.baseHP, affectedPokemon.hp + damage * effect.strength));
                    Logger.log(`${affectedPokemon.name} healed ${affectedPokemon.hp - originalHP}!`);
                    break;
                }
                case 'recoil': {
                    const originalHP = affectedPokemon.hp;
                    affectedPokemon.hp = Math.floor(Math.max(0, affectedPokemon.hp - damage * effect.strength));
                    Logger.log(`${affectedPokemon.name} took ${originalHP - affectedPokemon.hp} recoil damage!`);
                    break;
                }
            }
        }
        this.synchronizeStats();
    }
    synchronizeStats() {
        const stageMultiplier = [
            1 / 3,
            3 / 8,
            3 / 7,
            0.5,
            3 / 5,
            3 / 4,
            1,
            4 / 3,
            5 / 3,
            2,
            7 / 3,
            8 / 3,
            3,
        ];
        // Index 0 = -6, ..., Index 6 = 0, ..., Index 12 = +6
        [this.playerActivePokemon, this.opponentActivePokemon].forEach((pokemon) => {
            const getStage = (stage) => stageMultiplier[stage + 6];
            pokemon.attack = Math.floor(pokemon.baseAttack * getStage(pokemon.attackStage));
            if (pokemon.isBurned)
                pokemon.attack /= 2;
            pokemon.defense = Math.floor(pokemon.baseDefense * getStage(pokemon.defenseStage));
            pokemon.special = Math.floor(pokemon.baseSpecial * getStage(pokemon.specialStage));
            pokemon.speed = Math.floor(pokemon.baseSpeed * getStage(pokemon.speedStage));
            if (pokemon.isParalyzed)
                pokemon.speed /= 2;
            pokemon.accuracy = getStage(pokemon.accuracyStage);
            pokemon.evasion = getStage(pokemon.evasionStage);
        });
    }
}
//# sourceMappingURL=BattleEngine.js.map