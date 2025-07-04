import { moveData } from './data/moveData.js';
export default class Pokemon {
    constructor(pokemonData) {
        this.accuracy = 1;
        this.evasion = 1;
        this.attackStage = 0;
        this.defenseStage = 0;
        this.specialStage = 0;
        this.speedStage = 0;
        this.accuracyStage = 0;
        this.evasionStage = 0;
        this.badlyPoisonedStage = 0;
        this.sleepStage = 0;
        this.isBurned = false;
        this.isFrozen = false;
        this.isParalyzed = false;
        this.isPoisoned = false;
        this.isFlinched = false;
        this.name = pokemonData.name;
        this.types = pokemonData.types;
        this.baseHP = pokemonData.hp;
        this.baseAttack = pokemonData.attack;
        this.baseDefense = pokemonData.defense;
        this.baseSpecial = pokemonData.special;
        this.baseSpeed = pokemonData.speed;
        this.moves = pokemonData.moves.map((move) => structuredClone(moveData[move]));
        this.hp = this.baseHP;
        this.attack = this.baseAttack;
        this.defense = this.baseDefense;
        this.special = this.baseSpecial;
        this.speed = this.baseSpeed;
    }
    log() {
        console.log(this.name, this.types, this.baseHP, this.baseAttack, this.baseDefense, this.baseSpeed, this.baseSpecial, this.moves);
    }
}
//# sourceMappingURL=Pokemon.js.map