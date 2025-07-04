export default class Renderer {
    constructor(engine, playerName, playerHP, playerHPBar, playerImage, opponentName, opponentHP, opponentHPBar, opponentImage, mainButtons, moveButton, switchButton, moveButtons, move1Button, move2Button, move3Button, move4Button, moveBackButton, switchButtons, switch1Button, switch2Button, switch3Button, switch4Button, switch5Button, switch6Button, switchBackButton, battleLog) {
        this.engine = engine;
        this.playerName = playerName;
        this.playerHP = playerHP;
        this.playerHPBar = playerHPBar;
        this.playerImage = playerImage;
        this.opponentName = opponentName;
        this.opponentHP = opponentHP;
        this.opponentHPBar = opponentHPBar;
        this.opponentImage = opponentImage;
        this.mainButtons = mainButtons;
        this.moveButton = moveButton;
        this.switchButton = switchButton;
        this.moveButtons = moveButtons;
        this.move1Button = move1Button;
        this.move2Button = move2Button;
        this.move3Button = move3Button;
        this.move4Button = move4Button;
        this.moveBackButton = moveBackButton;
        this.switchButtons = switchButtons;
        this.switch1Button = switch1Button;
        this.switch2Button = switch2Button;
        this.switch3Button = switch3Button;
        this.switch4Button = switch4Button;
        this.switch5Button = switch5Button;
        this.switch6Button = switch6Button;
        this.switchBackButton = switchBackButton;
        this.battleLog = battleLog;
        this.setupEventListeners();
        this.render();
    }
    setupEventListeners() {
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
    }
    render() {
        this.changePokemon();
    }
    changeMenu(menu) {
        switch (menu) {
            case 'main': {
                this.mainButtons.classList.remove('hidden');
                this.moveButtons.classList.add('hidden');
                this.switchButtons.classList.add('hidden');
                break;
            }
            case 'move': {
                const moves = this.engine.playerActivePokemon.moves;
                this.move1Button.textContent = `${moves[0].name} ${moves[0].pp}/${moves[0].maxPP}`;
                this.move2Button.textContent = `${moves[1].name} ${moves[1].pp}/${moves[1].maxPP}`;
                this.move3Button.textContent = `${moves[2].name} ${moves[2].pp}/${moves[2].maxPP}`;
                this.move4Button.textContent = `${moves[3].name} ${moves[3].pp}/${moves[3].maxPP}`;
                this.mainButtons.classList.add('hidden');
                this.moveButtons.classList.remove('hidden');
                this.switchButtons.classList.add('hidden');
                break;
            }
            case 'switch': {
                const pokemons = this.engine.playerTeam;
                this.switch1Button.textContent = `${pokemons[0].name} ${pokemons[0].hp}/${pokemons[0].baseHP}`;
                this.switch2Button.textContent = `${pokemons[1].name} ${pokemons[1].hp}/${pokemons[1].baseHP}`;
                this.switch3Button.textContent = `${pokemons[2].name} ${pokemons[2].hp}/${pokemons[2].baseHP}`;
                this.switch4Button.textContent = `${pokemons[3].name} ${pokemons[3].hp}/${pokemons[3].baseHP}`;
                this.switch5Button.textContent = `${pokemons[4].name} ${pokemons[4].hp}/${pokemons[4].baseHP}`;
                this.switch6Button.textContent = `${pokemons[5].name} ${pokemons[5].hp}/${pokemons[5].baseHP}`;
                this.mainButtons.classList.add('hidden');
                this.moveButtons.classList.add('hidden');
                this.switchButtons.classList.remove('hidden');
                break;
            }
        }
    }
    changePokemon() {
        const playerPokemon = this.engine.playerActivePokemon;
        this.playerName.textContent = playerPokemon.name;
        this.playerHP.textContent = `HP: ${playerPokemon.hp}/${playerPokemon.baseHP}`;
        this.playerHPBar.value = playerPokemon.hp / playerPokemon.baseHP;
        this.playerImage.src = `assets/back/${playerPokemon.name}.png`;
        const opponentPokemon = this.engine.opponentActivePokemon;
        this.opponentName.textContent = opponentPokemon.name;
        this.opponentHP.textContent = `HP: ${opponentPokemon.hp}/${opponentPokemon.baseHP}`;
        this.opponentHPBar.value = opponentPokemon.hp / opponentPokemon.baseHP;
        this.opponentImage.src = `assets/front/${opponentPokemon.name}.png`;
    }
    useMove(moveIndex) {
        const moves = this.engine.playerActivePokemon.moves;
        if (!moves.some((move) => move.pp)) {
            this.engine.selectMove(-1);
        }
        else if (moves[moveIndex].pp) {
            this.engine.selectMove(moveIndex);
            this.changeMenu('main');
            this.render();
        }
    }
    log() {
        console.log(this.engine, this.playerName, this.playerHP, this.playerHPBar, this.playerImage, this.opponentName, this.opponentHP, this.opponentHPBar, this.opponentImage, this.mainButtons, this.moveButton, this.switchButton, this.moveButtons, this.move1Button, this.move2Button, this.move3Button, this.move4Button, this.moveBackButton, this.switchButtons, this.switch1Button, this.switch2Button, this.switch3Button, this.switch4Button, this.switch5Button, this.switch6Button, this.switchBackButton, this.battleLog);
    }
}
//# sourceMappingURL=Renderer.js.map