import { pokemonData } from './data/pokemonData.js';
import { PokemonData } from './types/PokemonData.js';
import BattleEngine from './BattleEngine.js';
import Renderer from './Renderer.js';
import Logger from './Logger.js';

export default class TeamBuilder {
  private selectedTeam: (PokemonData | null)[] = [
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  private availablePokemon: PokemonData[] = [];

  constructor(
    private teamBuilderElement: HTMLElement,
    private battleScreenElement: HTMLElement,
    private teamCountElement: HTMLElement,
    private pokemonGridElement: HTMLElement,
    private startBattleButton: HTMLButtonElement,
    private randomTeamButton: HTMLButtonElement,
    private clearTeamButton: HTMLButtonElement,
    private slotElements: HTMLElement[],
  ) {
    this.loadAvailablePokemon();
    this.setupEventListeners();
    this.renderPokemonGrid();
    this.updateTeamDisplay();
  }

  private loadAvailablePokemon(): void {
    this.availablePokemon = Object.values(pokemonData);
  }

  private setupEventListeners(): void {
    this.startBattleButton.addEventListener('click', () => {
      this.startBattle();
    });

    this.randomTeamButton.addEventListener('click', () => {
      this.generateRandomTeam();
    });

    this.clearTeamButton.addEventListener('click', () => {
      this.clearTeam();
    });

    this.slotElements.forEach((slot, index) => {
      slot.addEventListener('click', () => {
        if (this.selectedTeam[index] !== null) {
          this.removePokemonFromTeam(index);
        }
      });
    });
  }

  private renderPokemonGrid(): void {
    this.pokemonGridElement.innerHTML = '';

    this.availablePokemon.forEach((pokemon) => {
      const pokemonElement = document.createElement('div');
      pokemonElement.className = 'pokemon-option';
      pokemonElement.textContent = pokemon.name;

      const isSelected = this.selectedTeam.some(
        (p) => p?.name === pokemon.name,
      );
      if (isSelected) {
        pokemonElement.classList.add('selected');
      }

      const teamFull = this.selectedTeam.filter((p) => p !== null).length >= 6;
      if (teamFull && !isSelected) {
        pokemonElement.classList.add('disabled');
      }

      pokemonElement.addEventListener('click', () => {
        this.togglePokemon(pokemon);
      });

      this.pokemonGridElement.appendChild(pokemonElement);
    });
  }

  private togglePokemon(pokemon: PokemonData): void {
    const existingIndex = this.selectedTeam.findIndex(
      (p) => p?.name === pokemon.name,
    );

    if (existingIndex !== -1) {
      this.selectedTeam[existingIndex] = null;
    } else {
      const emptySlot = this.selectedTeam.findIndex((p) => p === null);
      if (emptySlot !== -1) {
        this.selectedTeam[emptySlot] = pokemon;
      }
    }

    this.updateTeamDisplay();
    this.renderPokemonGrid();
  }

  private removePokemonFromTeam(index: number): void {
    if (this.selectedTeam[index] !== null) {
      this.selectedTeam[index] = null;
      this.updateTeamDisplay();
      this.renderPokemonGrid();
    }
  }

  private updateTeamDisplay(): void {
    const teamCount = this.selectedTeam.filter((p) => p !== null).length;
    this.teamCountElement.textContent = teamCount.toString();

    this.slotElements.forEach((slot, index) => {
      const pokemon = this.selectedTeam[index];
      if (pokemon) {
        slot.textContent = pokemon.name;
        slot.classList.add('filled');
        slot.classList.remove('empty');
      } else {
        slot.textContent = 'Empty';
        slot.classList.remove('filled');
        slot.classList.add('empty');
      }
    });

    this.startBattleButton.disabled = teamCount === 0;
  }

  private generateRandomTeam(): void {
    const shuffled = [...this.availablePokemon].sort(() => Math.random() - 0.5);
    this.selectedTeam = shuffled.slice(0, 6);
    this.updateTeamDisplay();
    this.renderPokemonGrid();
  }

  private clearTeam(): void {
    this.selectedTeam = [null, null, null, null, null, null];
    this.updateTeamDisplay();
    this.renderPokemonGrid();
  }

  private getRandomOpponentTeam(): PokemonData[] {
    const shuffled = [...this.availablePokemon].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }

  private startBattle(): void {
    const playerTeam = this.selectedTeam.filter(
      (p) => p !== null,
    ) as PokemonData[];
    if (playerTeam.length === 0) {
      alert('Please select at least one Pokémon!');
      return;
    }

    const opponentTeam = this.getRandomOpponentTeam();

    this.teamBuilderElement.classList.add('hidden');
    this.battleScreenElement.classList.remove('hidden');

    const battleLog = document.getElementById(
      'battle-log',
    )! as HTMLOListElement;
    Logger.getInstance(battleLog);

    const engine = new BattleEngine(playerTeam, opponentTeam);

    const playerName = document.getElementById('player-name')!;
    const playerHP = document.getElementById('player-hp')!;
    const playerHPBar = document.getElementById(
      'player-hp-bar',
    )! as HTMLProgressElement;
    const playerImage = document.getElementById(
      'player-image',
    )! as HTMLImageElement;
    const opponentName = document.getElementById('opponent-name')!;
    const opponentHP = document.getElementById('opponent-hp')!;
    const opponentHPBar = document.getElementById(
      'opponent-hp-bar',
    )! as HTMLProgressElement;
    const opponentImage = document.getElementById(
      'opponent-image',
    )! as HTMLImageElement;
    const mainButtons = document.getElementById(
      'main-buttons',
    )! as HTMLDivElement;
    const moveButton = document.getElementById(
      'move-button',
    )! as HTMLButtonElement;
    const switchButton = document.getElementById(
      'switch-button',
    )! as HTMLButtonElement;
    const moveButtons = document.getElementById(
      'move-buttons',
    )! as HTMLDivElement;
    const move1Button = document.getElementById(
      'move-1-button',
    )! as HTMLButtonElement;
    const move2Button = document.getElementById(
      'move-2-button',
    )! as HTMLButtonElement;
    const move3Button = document.getElementById(
      'move-3-button',
    )! as HTMLButtonElement;
    const move4Button = document.getElementById(
      'move-4-button',
    )! as HTMLButtonElement;
    const moveBackButton = document.getElementById(
      'move-back-button',
    )! as HTMLButtonElement;
    const switchButtons = document.getElementById(
      'switch-buttons',
    )! as HTMLDivElement;
    const switch1Button = document.getElementById(
      'switch-1-button',
    )! as HTMLButtonElement;
    const switch2Button = document.getElementById(
      'switch-2-button',
    )! as HTMLButtonElement;
    const switch3Button = document.getElementById(
      'switch-3-button',
    )! as HTMLButtonElement;
    const switch4Button = document.getElementById(
      'switch-4-button',
    )! as HTMLButtonElement;
    const switch5Button = document.getElementById(
      'switch-5-button',
    )! as HTMLButtonElement;
    const switch6Button = document.getElementById(
      'switch-6-button',
    )! as HTMLButtonElement;
    const switchBackButton = document.getElementById(
      'switch-back-button',
    )! as HTMLButtonElement;

    const renderer = new Renderer(
      engine,
      playerName,
      playerHP,
      playerHPBar,
      playerImage,
      opponentName,
      opponentHP,
      opponentHPBar,
      opponentImage,
      mainButtons,
      moveButton,
      switchButton,
      moveButtons,
      move1Button,
      move2Button,
      move3Button,
      move4Button,
      moveBackButton,
      switchButtons,
      switch1Button,
      switch2Button,
      switch3Button,
      switch4Button,
      switch5Button,
      switch6Button,
      switchBackButton,
    );

    void renderer;
  }
}
