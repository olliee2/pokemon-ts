import TeamBuilder from './TeamBuilder.js';
// Team Builder Elements
const teamBuilderElement = document.getElementById('team-builder');
const battleScreenElement = document.getElementById('battle-screen');
const teamCountElement = document.getElementById('team-count');
const pokemonGridElement = document.getElementById('pokemon-grid');
const startBattleButton = document.getElementById('start-battle-button');
const randomTeamButton = document.getElementById('random-team-button');
const clearTeamButton = document.getElementById('clear-team-button');
// Team slot elements
const slotElements = [
    document.getElementById('slot-1'),
    document.getElementById('slot-2'),
    document.getElementById('slot-3'),
    document.getElementById('slot-4'),
    document.getElementById('slot-5'),
    document.getElementById('slot-6'),
];
const teamBuilder = new TeamBuilder(teamBuilderElement, battleScreenElement, teamCountElement, pokemonGridElement, startBattleButton, randomTeamButton, clearTeamButton, slotElements);
void teamBuilder;
//# sourceMappingURL=index.js.map