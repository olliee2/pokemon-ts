export default class TeamBuilder {
    constructor(teamBuilderElement, battleScreenElement, teamCountElement, pokemonGridElement, startBattleButton, clearTeamButton, slotElements) {
        this.teamBuilderElement = teamBuilderElement;
        this.battleScreenElement = battleScreenElement;
        this.teamCountElement = teamCountElement;
        this.pokemonGridElement = pokemonGridElement;
        this.startBattleButton = startBattleButton;
        this.clearTeamButton = clearTeamButton;
        this.slotElements = slotElements;
        this.selectedTeam = [
            null,
            null,
            null,
            null,
            null,
            null,
        ];
        this.availablePokemon = [];
        this.loadAvailablePokemon();
        this.setupEventListeners();
        this.renderPokemonGrid();
        this.updateTeamDisplay();
    }
    renderPokemonGrid() {
        this.pokemonGridElement.replaceChildren();
        this.availablePokemon.forEach((pokemon) => {
            const pokemonElement = document.createElement('div');
            pokemonElement.className = 'pokemon-option';
            pokemonElement.textContent = pokemon.name;
            const isSelected = this.selectedTeam.some((p) => (p === null || p === void 0 ? void 0 : p.name) === pokemon.name);
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
    togglePokemon(pokemon) {
        const existingIndex = this.selectedTeam.findIndex((p) => (p === null || p === void 0 ? void 0 : p.name) === pokemon.name);
        if (existingIndex !== -1) {
            this.selectedTeam[existingIndex] = null;
        }
        else {
            const emptySlot = this.selectedTeam.findIndex((p) => p === null);
        }
    }
}
//# sourceMappingURL=TeamBuilder.js.map