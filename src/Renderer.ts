import BattleEngine from './BattleEngine';

type Menu = 'main' | 'move' | 'switch';

export default class Renderer {
  constructor(
    private engine: BattleEngine,
    private playerName: HTMLElement,
    private playerHP: HTMLElement,
    private playerHPBar: HTMLProgressElement,
    private playerImage: HTMLImageElement,
    private opponentName: HTMLElement,
    private opponentHP: HTMLElement,
    private opponentHPBar: HTMLProgressElement,
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
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners(): void {
    this.moveButton.addEventListener('click', () => {
      this.changeMenu('move');
    });
    this.switchButton.addEventListener('click', () => {
      this.changeMenu('switch');
    });
    this.moveBackButton.addEventListener('click', () => {
      this.changeMenu('main');
    });
    this.switchBackButton.addEventListener('click', () => {
      this.changeMenu('main');
    });

    this.move1Button.addEventListener('click', () => {
      this.useMove(0);
    });

    this.move2Button.addEventListener('click', () => {
      this.useMove(1);
    });
    this.move3Button.addEventListener('click', () => {
      this.useMove(2);
    });
    this.move4Button.addEventListener('click', () => {
      this.useMove(3);
    });
  }

  render(): void {
    this.changePokemon();
  }

  changeMenu(menu: Menu): void {
    switch (menu) {
      case 'main': {
        this.mainButtons.classList.remove('hidden');
        this.moveButtons.classList.add('hidden');
        this.switchButtons.classList.add('hidden');
        break;
      }
      case 'move': {
        const moves = this.engine.playerActivePokemon.moves;
        this.move1Button.textContent = `${moves[0].name} ${moves[0].pp}/${moves[0].maxPP}`;
        this.move2Button.textContent = `${moves[1].name} ${moves[1].pp}/${moves[1].maxPP}`;
        this.move3Button.textContent = `${moves[2].name} ${moves[2].pp}/${moves[2].maxPP}`;
        this.move4Button.textContent = `${moves[3].name} ${moves[3].pp}/${moves[3].maxPP}`;

        this.mainButtons.classList.add('hidden');
        this.moveButtons.classList.remove('hidden');
        this.switchButtons.classList.add('hidden');
        break;
      }
      case 'switch': {
        const pokemons = this.engine.playerTeam;
        this.switch1Button.textContent = `${pokemons[0].name} ${pokemons[0].hp}/${pokemons[0].baseHP}`;
        this.switch2Button.textContent = `${pokemons[1].name} ${pokemons[1].hp}/${pokemons[1].baseHP}`;
        this.switch3Button.textContent = `${pokemons[2].name} ${pokemons[2].hp}/${pokemons[2].baseHP}`;
        this.switch4Button.textContent = `${pokemons[3].name} ${pokemons[3].hp}/${pokemons[3].baseHP}`;
        this.switch5Button.textContent = `${pokemons[4].name} ${pokemons[4].hp}/${pokemons[4].baseHP}`;
        this.switch6Button.textContent = `${pokemons[5].name} ${pokemons[5].hp}/${pokemons[5].baseHP}`;

        this.mainButtons.classList.add('hidden');
        this.moveButtons.classList.add('hidden');
        this.switchButtons.classList.remove('hidden');
        break;
      }
    }
  }

  changePokemon(): void {
    const playerPokemon = this.engine.playerActivePokemon;
    this.playerName.textContent = playerPokemon.name;
    this.playerHP.textContent = `HP: ${playerPokemon.hp}/${playerPokemon.baseHP}`;
    this.playerHPBar.value = playerPokemon.hp / playerPokemon.baseHP;
    this.playerImage.src = `assets/back/${playerPokemon.name}.png`;

    const opponentPokemon = this.engine.opponentActivePokemon;
    this.opponentName.textContent = opponentPokemon.name;
    this.opponentHP.textContent = `HP: ${opponentPokemon.hp}/${opponentPokemon.baseHP}`;
    this.opponentHPBar.value = opponentPokemon.hp / opponentPokemon.baseHP;
    this.opponentImage.src = `assets/front/${opponentPokemon.name}.png`;
  }

  useMove(moveIndex: number): void {
    const moves = this.engine.playerActivePokemon.moves;
    if (!moves.some((move) => move.pp)) {
      this.engine.selectMove(-1);
    } else if (moves[moveIndex].pp) {
      this.engine.selectMove(moveIndex);
      this.changeMenu('main');
      this.render();
    }
  }

  log(): void {
    console.log(
      this.engine,
      this.playerName,
      this.playerHP,
      this.playerHPBar,
      this.playerImage,
      this.opponentName,
      this.opponentHP,
      this.opponentHPBar,
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
