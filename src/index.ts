import { pokemonData } from './data/pokemonData.js';
import BattleEngine from './BattleEngine.js';
import Renderer from './Renderer.js';
import Logger from './Logger.js';
import { PokemonData } from './types/PokemonData';

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
const mainButtons = document.getElementById('main-buttons')! as HTMLDivElement;
const moveButton = document.getElementById('move-button')! as HTMLButtonElement;
const switchButton = document.getElementById(
  'switch-button',
)! as HTMLButtonElement;
const moveButtons = document.getElementById('move-buttons')! as HTMLDivElement;
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
const battleLog = document.getElementById('battle-log')! as HTMLOListElement;

const allPokemonNames = Object.keys(pokemonData);

function getRandomTeam(): PokemonData[] {
  const names: string[] = [...allPokemonNames];
  for (let i = names.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [names[i], names[j]] = [names[j], names[i]];
  }
  return names
    .slice(0, 6)
    .map((name: string) => (pokemonData as Record<string, PokemonData>)[name]);
}

const playerTeam = getRandomTeam();
const opponentTeam = getRandomTeam();

Logger.getInstance(battleLog);
Logger.log('Loading Game...');

const engine = new BattleEngine(playerTeam, opponentTeam);

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
renderer.render();

Logger.log('Loading Complete!');
