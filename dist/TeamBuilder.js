import { pokemonData } from './data/pokemonData.js';
import BattleEngine from './BattleEngine.js';
import Renderer from './Renderer.js';
import Logger from './Logger.js';
export default class TeamBuilder {
    constructor(teamBuilderElement, battleScreenElement, teamCountElement, pokemonGridElement, startBattleButton, randomTeamButton, clearTeamButton, slotElements) {
        this.teamBuilderElement = teamBuilderElement;
        this.battleScreenElement = battleScreenElement;
        this.teamCountElement = teamCountElement;
        this.pokemonGridElement = pokemonGridElement;
        this.startBattleButton = startBattleButton;
        this.randomTeamButton = randomTeamButton;
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
    loadAvailablePokemon() {
        this.availablePokemon = Object.values(pokemonData);
    }
    setupEventListeners() {
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
    renderPokemonGrid() {
        this.pokemonGridElement.innerHTML = '';
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
            if (emptySlot !== -1) {
                this.selectedTeam[emptySlot] = pokemon;
            }
        }
        this.updateTeamDisplay();
        this.renderPokemonGrid();
    }
    removePokemonFromTeam(index) {
        if (this.selectedTeam[index] !== null) {
            this.selectedTeam[index] = null;
            this.updateTeamDisplay();
            this.renderPokemonGrid();
        }
    }
    updateTeamDisplay() {
        const teamCount = this.selectedTeam.filter((p) => p !== null).length;
        this.teamCountElement.textContent = teamCount.toString();
        this.slotElements.forEach((slot, index) => {
            const pokemon = this.selectedTeam[index];
            if (pokemon) {
                slot.textContent = pokemon.name;
                slot.classList.add('filled');
                slot.classList.remove('empty');
            }
            else {
                slot.textContent = 'Empty';
                slot.classList.remove('filled');
                slot.classList.add('empty');
            }
        });
        this.startBattleButton.disabled = teamCount === 0;
    }
    generateRandomTeam() {
        const shuffled = [...this.availablePokemon].sort(() => Math.random() - 0.5);
        this.selectedTeam = shuffled.slice(0, 6);
        this.updateTeamDisplay();
        this.renderPokemonGrid();
    }
    clearTeam() {
        this.selectedTeam = [null, null, null, null, null, null];
        this.updateTeamDisplay();
        this.renderPokemonGrid();
    }
    getRandomOpponentTeam() {
        const shuffled = [...this.availablePokemon].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 6);
    }
    startBattle() {
        const playerTeam = this.selectedTeam.filter((p) => p !== null);
        if (playerTeam.length === 0) {
            alert('Please select at least one Pokémon!');
            return;
        }
        const opponentTeam = this.getRandomOpponentTeam();
        this.teamBuilderElement.classList.add('hidden');
        this.battleScreenElement.classList.remove('hidden');
        const battleLog = document.getElementById('battle-log');
        Logger.getInstance(battleLog);
        const engine = new BattleEngine(playerTeam, opponentTeam);
        const playerName = document.getElementById('player-name');
        const playerHP = document.getElementById('player-hp');
        const playerHPBar = document.getElementById('player-hp-bar');
        const playerImage = document.getElementById('player-image');
        const opponentName = document.getElementById('opponent-name');
        const opponentHP = document.getElementById('opponent-hp');
        const opponentHPBar = document.getElementById('opponent-hp-bar');
        const opponentImage = document.getElementById('opponent-image');
        const mainButtons = document.getElementById('main-buttons');
        const moveButton = document.getElementById('move-button');
        const switchButton = document.getElementById('switch-button');
        const moveButtons = document.getElementById('move-buttons');
        const move1Button = document.getElementById('move-1-button');
        const move2Button = document.getElementById('move-2-button');
        const move3Button = document.getElementById('move-3-button');
        const move4Button = document.getElementById('move-4-button');
        const moveBackButton = document.getElementById('move-back-button');
        const switchButtons = document.getElementById('switch-buttons');
        const switch1Button = document.getElementById('switch-1-button');
        const switch2Button = document.getElementById('switch-2-button');
        const switch3Button = document.getElementById('switch-3-button');
        const switch4Button = document.getElementById('switch-4-button');
        const switch5Button = document.getElementById('switch-5-button');
        const switch6Button = document.getElementById('switch-6-button');
        const switchBackButton = document.getElementById('switch-back-button');
        const renderer = new Renderer(engine, playerName, playerHP, playerHPBar, playerImage, opponentName, opponentHP, opponentHPBar, opponentImage, mainButtons, moveButton, switchButton, moveButtons, move1Button, move2Button, move3Button, move4Button, moveBackButton, switchButtons, switch1Button, switch2Button, switch3Button, switch4Button, switch5Button, switch6Button, switchBackButton);
        void renderer;
    }
}
//# sourceMappingURL=TeamBuilder.js.map