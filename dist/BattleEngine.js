import Pokemon from './Pokemon.js';
export default class BattleEngine {
    constructor(playerTeamData, opponentTeamData) {
        this.playerTeam = playerTeamData.map((data) => new Pokemon(data));
        this.playerActiveSlot = 0;
        this.playerActivePokemon = this.playerTeam[0];
        this.opponentTeam = opponentTeamData.map((data) => new Pokemon(data));
        this.opponentActiveSlot = 0;
        this.opponentActivePokemon = this.opponentTeam[0];
    }
    log() {
        console.log(this.playerTeam, this.playerActiveSlot, this.playerActivePokemon, this.opponentTeam, this.opponentActiveSlot, this.opponentActivePokemon);
    }
}
//# sourceMappingURL=BattleEngine.js.map