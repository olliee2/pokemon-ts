import { PokemonData } from './types/PokemonData';
import Pokemon from './Pokemon';

export default class BattleEngine {
  private playerTeam: Pokemon[];
  private opponentTeam: Pokemon[];

  constructor(playerTeamData: PokemonData[], opponentTeamData: PokemonData[]) {
    this.playerTeam = playerTeamData.map((data) => new Pokemon(data));
    this.opponentTeam = opponentTeamData.map((data) => new Pokemon(data));
  }

  log(): void {
    console.log(this.playerTeam, this.opponentTeam);
  }
}
