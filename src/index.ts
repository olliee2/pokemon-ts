import BattleEngine from './BattleEngine.js';
import { pokemonData } from './data/pokemonData.js';
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

const engine = new BattleEngine(pokemonData.slice(0, 6), pokemonData.slice(6));
const renderer = new Renderer(
  engine,
  playerName,
  playerHP,
  playerImage,
  opponentName,
  opponentHP,
  opponentImage,
);
engine.log();
renderer.log();
console.log('loaded!');
