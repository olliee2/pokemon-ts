import { moveData } from './data/moveData';
export default class Pokemon {
    constructor(pokemonData) {
        this.name = pokemonData.name;
        this.types = pokemonData.types;
        this.baseHP = pokemonData.hp;
        this.baseAttack = pokemonData.attack;
        this.baseDefense = pokemonData.defense;
        this.baseSpecial = pokemonData.special;
        this.baseSpeed = pokemonData.speed;
        this.moves = pokemonData.moves.map((move) => moveData[move]);
        this.hp = this.baseHP;
        this.attack = this.baseAttack;
        this.defense = this.baseDefense;
        this.special = this.baseSpecial;
        this.speed = this.baseSpeed;
        this.accuracy = 1;
        this.evasion = 1;
    }
    log() {
        console.log(this.name, this.types, this.baseHP, this.baseAttack, this.baseDefense, this.baseSpeed, this.baseSpecial, this.moves);
    }
}
//# sourceMappingURL=Pokemon.js.map