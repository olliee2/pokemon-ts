import BattleEngine from './BattleEngine';

export default class Renderer {
  constructor(
    private engine: BattleEngine,
    private playerName: HTMLElement,
    private playerHP: HTMLProgressElement,
    private playerImage: HTMLImageElement,
    private opponentName: HTMLElement,
    private opponentHP: HTMLProgressElement,
    private opponentImage: HTMLImageElement,
  ) {}

  log(): void {
    console.log(
      this.engine,
      this.playerName,
      this.playerHP,
      this.playerImage,
      this.opponentName,
      this.opponentHP,
      this.opponentImage,
    );
  }
}
