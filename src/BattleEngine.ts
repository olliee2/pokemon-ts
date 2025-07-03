import { PokemonData } from './types/PokemonData';

export default class BattleEngine {
  constructor(
    private playerTeam: PokemonData[],
    private opponentTeam: PokemonData[],
  ) {}

  log(): void {
    console.log(this.playerTeam, this.opponentTeam);
  }
}
