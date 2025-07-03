import Pokemon from './Pokemon';
export default class BattleEngine {
    constructor(playerTeamData, opponentTeamData) {
        this.playerTeam = playerTeamData.map((data) => new Pokemon(data));
        this.opponentTeam = opponentTeamData.map((data) => new Pokemon(data));
    }
    log() {
        console.log(this.playerTeam, this.opponentTeam);
    }
}
//# sourceMappingURL=BattleEngine.js.map