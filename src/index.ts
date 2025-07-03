import { pokemonData } from './data/pokemonData.js';
import BattleEngine from './BattleEngine.js';
import Renderer from './Renderer.js';

const playerName = document.getElementById('player-name')!;
const playerHP = document.getElementById('player-hp')! as HTMLProgressElement;
const playerImage = document.getElementById(
  'player-image',
)! as HTMLImageElement;
const opponentName = document.getElementById('opponent-name')!;
const opponentHP = document.getElementById(
  'opponent-hp',
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

const allPokemonData = Object.values(pokemonData);

const engine = new BattleEngine(
  allPokemonData.slice(0, 6), // player team: first 6
  allPokemonData.slice(6, 12), // opponent team: next 6
);

const renderer = new Renderer(
  engine,
  playerName,
  playerHP,
  playerImage,
  opponentName,
  opponentHP,
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
  battleLog,
);
engine.log();
renderer.log();
console.log('loaded!');
