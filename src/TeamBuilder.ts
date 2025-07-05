import { PokemonData } from './types/PokemonData.js';

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
    private clearTeamButton: HTMLButtonElement,
    private slotElements: HTMLElement[],
  ) {
    this.loadAvailablePokemon();
    this.setupEventListeners();
    this.renderPokemonGrid();
    this.updateTeamDisplay();
  }

  private renderPokemonGrid(): void {
    this.pokemonGridElement.replaceChildren();

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
    }
  }
}
