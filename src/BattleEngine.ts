import type { PokemonData } from './types/PokemonData';
import Pokemon from './Pokemon.js';

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
}
