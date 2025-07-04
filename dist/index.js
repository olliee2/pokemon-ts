import { pokemonData } from './data/pokemonData.js';
import BattleEngine from './BattleEngine.js';
import Renderer from './Renderer.js';
import Logger from './Logger.js';
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
const battleLog = document.getElementById('battle-log');
const allPokemonNames = Object.keys(pokemonData);
function getRandomTeam() {
    const names = [...allPokemonNames];
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }
    return names.slice(0, 6).map((name) => pokemonData[name]);
}
const playerTeam = getRandomTeam();
const opponentTeam = getRandomTeam();
Logger.getInstance(battleLog);
Logger.log('Loading Game...');
const engine = new BattleEngine(playerTeam, opponentTeam);
const renderer = new Renderer(engine, playerName, playerHP, playerHPBar, playerImage, opponentName, opponentHP, opponentHPBar, opponentImage, mainButtons, moveButton, switchButton, moveButtons, move1Button, move2Button, move3Button, move4Button, moveBackButton, switchButtons, switch1Button, switch2Button, switch3Button, switch4Button, switch5Button, switch6Button, switchBackButton);
renderer.render();
Logger.log('Loading Complete!');
//# sourceMappingURL=index.js.map