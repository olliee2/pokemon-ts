import BattleEngine from './BattleEngine';
import Logger from './Logger.js';
import Pokemon from './Pokemon';

type Menu = 'main' | 'move' | 'switch' | 'forcedSwitch';

export default class Renderer {
  private isAnimating = false;

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
    private playerStatus: HTMLElement,
    private opponentStatus: HTMLElement,
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
    this.playerStatus.textContent = this.getPokemonStatus(playerPokemon);

    const opponentPokemon = this.engine.opponentActivePokemon;
    this.opponentName.textContent = opponentPokemon.name;
    this.opponentHP.textContent = `HP: ${opponentPokemon.hp}/${opponentPokemon.baseHP}`;
    this.opponentHPBar.value = opponentPokemon.hp / opponentPokemon.baseHP;
    this.opponentImage.src = `assets/front/${opponentPokemon.name}.png`;
    this.opponentStatus.textContent = this.getPokemonStatus(opponentPokemon);
  }

  async useMove(moveIndex: number): Promise<void> {
    if (this.isAnimating || this.engine.playerActivePokemon.hp <= 0) return;

    this.isAnimating = true;
    this.disableAllButtons();

    const moves = this.engine.playerActivePokemon.moves;
    const moveToUse = !moves.some((move) => move.pp)
      ? -1
      : moves[moveIndex].pp
        ? moveIndex
        : undefined;

    if (moveToUse !== undefined) {
      const playerPokemonBefore = {
        pokemon: this.engine.playerActivePokemon,
        hp: this.engine.playerActivePokemon.hp,
      };
      const opponentPokemonBefore = {
        pokemon: this.engine.opponentActivePokemon,
        hp: this.engine.opponentActivePokemon.hp,
      };

      const result = this.engine.selectMove(moveToUse);

      await this.animateBattleSequence(
        playerPokemonBefore,
        opponentPokemonBefore,
        result,
      );

      this.handleResult(result);
      this.render();
    }

    this.isAnimating = false;
    this.enableAllButtons();
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

  private getPokemonStatus(pokemon: Pokemon): string {
    if (pokemon.isBurned) return 'Burned';
    if (pokemon.isPoisoned) return 'Poisoned';
    if (pokemon.badlyPoisonedStage) return 'Badly Poisoned';
    if (pokemon.isFrozen) return 'Frozen';
    if (pokemon.isParalyzed) return 'Paralyzed';
    if (pokemon.sleepStage) return 'Asleep';
    return 'Healthy';
  }

  private async animateBattleSequence(
    playerBefore: { pokemon: any; hp: number },
    opponentBefore: { pokemon: any; hp: number },
    result: 'Pokemon Select' | 'Player Win' | 'Opponent Win' | undefined,
  ): Promise<void> {
    const battleEndedEarly =
      result === 'Pokemon Select' ||
      result === 'Player Win' ||
      result === 'Opponent Win';

    await this.animateAttack(this.playerImage);
    await this.sleep(200);

    if (
      this.engine.opponentActivePokemon.hp < opponentBefore.hp ||
      (battleEndedEarly &&
        opponentBefore.pokemon === this.engine.opponentActivePokemon)
    ) {
      await this.animateDamage(this.opponentImage);
      await this.animateHPChange(
        this.opponentHPBar,
        this.opponentHP,
        this.engine.opponentActivePokemon,
      );
    }

    if (this.engine.opponentActivePokemon.hp <= 0) {
      await this.animateFaint(this.opponentImage);
      await this.sleep(500);

      if (this.engine.opponentActivePokemon.hp > 0) {
        await this.animateSwitchIn(this.opponentImage);
      }

      if (battleEndedEarly) {
        return;
      }
    }

    if (this.engine.opponentActivePokemon.hp > 0 && !battleEndedEarly) {
      await this.sleep(800);

      await this.animateAttack(this.opponentImage);
      await this.sleep(200);

      if (this.engine.playerActivePokemon.hp < playerBefore.hp) {
        await this.animateDamage(this.playerImage);
        await this.animateHPChange(
          this.playerHPBar,
          this.playerHP,
          this.engine.playerActivePokemon,
        );
      }

      if (this.engine.playerActivePokemon.hp <= 0) {
        await this.animateFaint(this.playerImage);
        await this.sleep(500);
      }
    }
  }

  private async animateAttack(image: HTMLImageElement): Promise<void> {
    return new Promise((resolve) => {
      image.classList.add('pokemon-attack');
      setTimeout(() => {
        image.classList.remove('pokemon-attack');
        resolve();
      }, 600);
    });
  }

  private async animateDamage(image: HTMLImageElement): Promise<void> {
    return new Promise((resolve) => {
      image.classList.add('pokemon-damage');
      setTimeout(() => {
        image.classList.remove('pokemon-damage');
        resolve();
      }, 800);
    });
  }

  private async animateHPChange(
    hpBar: HTMLProgressElement,
    hpText: HTMLElement,
    pokemon: any,
  ): Promise<void> {
    return new Promise((resolve) => {
      const targetValue = pokemon.hp / pokemon.baseHP;
      hpBar.classList.add('hp-bar-animate');

      hpBar.value = targetValue;

      hpText.textContent = `HP: ${pokemon.hp}/${pokemon.baseHP}`;

      setTimeout(() => {
        hpBar.classList.remove('hp-bar-animate');
        resolve();
      }, 800);
    });
  }

  private async animateFaint(image: HTMLImageElement): Promise<void> {
    return new Promise((resolve) => {
      image.classList.add('pokemon-faint');
      setTimeout(() => {
        image.classList.remove('pokemon-faint');
        resolve();
      }, 1200);
    });
  }

  private async animateSwitchIn(image: HTMLImageElement): Promise<void> {
    return new Promise((resolve) => {
      image.classList.add('pokemon-switch-in');
      setTimeout(() => {
        image.classList.remove('pokemon-switch-in');
        resolve();
      }, 800);
    });
  }

  private async animateSwitchOut(image: HTMLImageElement): Promise<void> {
    return new Promise((resolve) => {
      image.classList.add('pokemon-switch-out');
      setTimeout(() => {
        image.classList.remove('pokemon-switch-out');
        resolve();
      }, 600);
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private disableAllButtons(): void {
    [
      this.moveButton,
      this.switchButton,
      this.move1Button,
      this.move2Button,
      this.move3Button,
      this.move4Button,
      this.moveBackButton,
      this.switch1Button,
      this.switch2Button,
      this.switch3Button,
      this.switch4Button,
      this.switch5Button,
      this.switch6Button,
      this.switchBackButton,
    ].forEach((button) => (button.disabled = true));
  }

  private enableAllButtons(): void {
    [
      this.moveButton,
      this.switchButton,
      this.move1Button,
      this.move2Button,
      this.move3Button,
      this.move4Button,
      this.moveBackButton,
      this.switch1Button,
      this.switch2Button,
      this.switch3Button,
      this.switch4Button,
      this.switch5Button,
      this.switch6Button,
      this.switchBackButton,
    ].forEach((button) => (button.disabled = false));
  }

  private async switchPokemon(pokemonIndex: number): Promise<void> {
    const selectedPokemon = this.engine.playerTeam[pokemonIndex];
    if (
      selectedPokemon.hp > 0 &&
      selectedPokemon !== this.engine.playerActivePokemon
    ) {
      await this.animateSwitchOut(this.playerImage);

      this.engine.switchPokemon(pokemonIndex);
      this.changeMenu('main');

      await this.animateSwitchIn(this.playerImage);

      this.render();
    } else {
      Logger.log(`${selectedPokemon.name} is invalid to send out.`);
    }
  }
}
