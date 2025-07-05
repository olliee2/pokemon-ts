import BattleEngine from './BattleEngine';
import Logger from './Logger.js';

type Menu = 'main' | 'move' | 'switch' | 'forcedSwitch';

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

    this.switch1Button.addEventListener('click', () => {
      this.switchPokemon(0);
    });

    this.switch2Button.addEventListener('click', () => {
      this.switchPokemon(1);
    });

    this.switch3Button.addEventListener('click', () => {
      this.switchPokemon(2);
    });

    this.switch4Button.addEventListener('click', () => {
      this.switchPokemon(3);
    });

    this.switch5Button.addEventListener('click', () => {
      this.switchPokemon(4);
    });

    this.switch6Button.addEventListener('click', () => {
      this.switchPokemon(5);
    });
  }

  render(): void {
    this.changePokemon();
  }

  changeMenu(menu: Menu): void {
    this.mainButtons.classList.add('hidden');
    this.moveButtons.classList.add('hidden');
    this.switchButtons.classList.add('hidden');
    this.switchBackButton.classList.remove('hidden');

    if (menu === 'main') {
      this.mainButtons.classList.remove('hidden');
    } else if (menu === 'move') {
      const moves = this.engine.playerActivePokemon.moves;
      [
        this.move1Button,
        this.move2Button,
        this.move3Button,
        this.move4Button,
      ].forEach((btn, i) => {
        btn.textContent = `${moves[i].name} ${moves[i].pp}/${moves[i].maxPP}`;
      });
      this.moveButtons.classList.remove('hidden');
    } else if (menu === 'forcedSwitch' || menu === 'switch') {
      const pokemons = this.engine.playerTeam;
      [
        this.switch1Button,
        this.switch2Button,
        this.switch3Button,
        this.switch4Button,
        this.switch5Button,
        this.switch6Button,
      ].forEach((btn, i) => {
        btn.textContent = `${pokemons[i].name} ${pokemons[i].hp}/${pokemons[i].baseHP}`;
      });
      this.switchButtons.classList.remove('hidden');
      if (menu === 'forcedSwitch') {
        this.switchBackButton.classList.add('hidden');
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
    if (this.engine.playerActivePokemon.hp > 0) {
      const moves = this.engine.playerActivePokemon.moves;
      const moveToUse = !moves.some((move) => move.pp)
        ? -1
        : moves[moveIndex].pp
          ? moveIndex
          : undefined;
      if (moveToUse !== undefined) {
        const result = this.engine.selectMove(moveToUse);
        this.handleResult(result);
        this.render();
      }
    }
  }

  handleResult(
    result: 'Pokemon Select' | 'Opponent Win' | 'Player Win' | undefined,
  ): void {
    switch (result) {
      case 'Pokemon Select': {
        this.changeMenu('forcedSwitch');
        break;
      }
      case 'Opponent Win': {
        setTimeout(() => alert('Opponent Win!'), 100);
        break;
      }
      case 'Player Win': {
        setTimeout(() => alert('Player Win!'), 100);
        break;
      }
      default: {
        this.changeMenu('main');
        break;
      }
    }
  }

  private switchPokemon(pokemonIndex: number): void {
    const selectedPokemon = this.engine.playerTeam[pokemonIndex];
    if (
      selectedPokemon.hp > 0 &&
      selectedPokemon !== this.engine.playerActivePokemon
    ) {
      this.engine.switchPokemon(pokemonIndex);
      this.changeMenu('main');
      this.render();
    } else {
      Logger.log(`${selectedPokemon.name} is invalid to send out.`);
    }
  }
}
