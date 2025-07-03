import BattleEngine from './BattleEngine';

type Menu = 'main' | 'move' | 'switch';

export default class Renderer {
  constructor(
    private engine: BattleEngine,
    private playerName: HTMLElement,
    private playerHP: HTMLProgressElement,
    private playerImage: HTMLImageElement,
    private opponentName: HTMLElement,
    private opponentHP: HTMLProgressElement,
    private opponentImage: HTMLImageElement,
    private mainButtons: HTMLDivElement,
    private moveButton: HTMLButtonElement,
    private switchButton: HTMLButtonElement,
    private moveButtons: HTMLDivElement,
    private move1Button: HTMLButtonElement,
    private move2Button: HTMLButtonElement,
    private move3Button: HTMLButtonElement,
    private move4Button: HTMLButtonElement,
    private moveBackButton: HTMLButtonElement,
    private switchButtons: HTMLDivElement,
    private switch1Button: HTMLButtonElement,
    private switch2Button: HTMLButtonElement,
    private switch3Button: HTMLButtonElement,
    private switch4Button: HTMLButtonElement,
    private switch5Button: HTMLButtonElement,
    private switch6Button: HTMLButtonElement,
    private switchBackButton: HTMLButtonElement,
    private battleLog: HTMLOListElement,
  ) {
    moveButton.addEventListener('click', () => {
      this.changeMenu('move');
    });
    switchButton.addEventListener('click', () => {
      this.changeMenu('switch');
    });
    moveBackButton.addEventListener('click', () => {
      this.changeMenu('main');
    });
    switchBackButton.addEventListener('click', () => {
      this.changeMenu('main');
    });
  }

  render(): void {}

  changeMenu(menu: Menu): void {
    switch (menu) {
      case 'main':
        this.mainButtons.classList.remove('hidden');
        this.moveButtons.classList.add('hidden');
        this.switchButtons.classList.add('hidden');
        break;
      case 'move':
        this.mainButtons.classList.add('hidden');
        this.moveButtons.classList.remove('hidden');
        this.switchButtons.classList.add('hidden');
        break;
      case 'switch':
        this.mainButtons.classList.add('hidden');
        this.moveButtons.classList.add('hidden');
        this.switchButtons.classList.remove('hidden');
        break;
    }
  }

  log(): void {
    console.log(
      this.engine,
      this.playerName,
      this.playerHP,
      this.playerImage,
      this.opponentName,
      this.opponentHP,
      this.opponentImage,
      this.mainButtons,
      this.moveButton,
      this.switchButton,
      this.moveButtons,
      this.move1Button,
      this.move2Button,
      this.move3Button,
      this.move4Button,
      this.moveBackButton,
      this.switchButtons,
      this.switch1Button,
      this.switch2Button,
      this.switch3Button,
      this.switch4Button,
      this.switch5Button,
      this.switch6Button,
      this.switchBackButton,
      this.battleLog,
    );
  }
}
