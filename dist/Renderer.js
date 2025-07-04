import Logger from './Logger';
export default class Renderer {
    constructor(engine, playerName, playerHP, playerHPBar, playerImage, opponentName, opponentHP, opponentHPBar, opponentImage, mainButtons, moveButton, switchButton, moveButtons, move1Button, move2Button, move3Button, move4Button, moveBackButton, switchButtons, switch1Button, switch2Button, switch3Button, switch4Button, switch5Button, switch6Button, switchBackButton) {
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
        this.switch1Button.addEventListener('click', () => {
            this.switchPokemon(0);
        });
        this.switch2Button.addEventListener('click', () => {
            this.switchPokemon(1);
        });
        this.switch3Button.addEventListener('click', () => {
            this.switchPokemon(2);
        });
        this.switch4Button.addEventListener('click', () => {
            this.switchPokemon(3);
        });
        this.switch5Button.addEventListener('click', () => {
            this.switchPokemon(4);
        });
        this.switch6Button.addEventListener('click', () => {
            this.switchPokemon(5);
        });
    }
    render() {
        this.changePokemon();
    }
    changeMenu(menu) {
        this.mainButtons.classList.add('hidden');
        this.moveButtons.classList.add('hidden');
        this.switchButtons.classList.add('hidden');
        this.switchBackButton.classList.remove('hidden');
        if (menu === 'main') {
            this.mainButtons.classList.remove('hidden');
        }
        else if (menu === 'move') {
            const moves = this.engine.playerActivePokemon.moves;
            [
                this.move1Button,
                this.move2Button,
                this.move3Button,
                this.move4Button,
            ].forEach((btn, i) => {
                btn.textContent = `${moves[i].name} ${moves[i].pp}/${moves[i].maxPP}`;
            });
            this.moveButtons.classList.remove('hidden');
        }
        else if (menu === 'forcedSwitch' || menu === 'switch') {
            const pokemons = this.engine.playerTeam;
            [
                this.switch1Button,
                this.switch2Button,
                this.switch3Button,
                this.switch4Button,
                this.switch5Button,
                this.switch6Button,
            ].forEach((btn, i) => {
                btn.textContent = `${pokemons[i].name} ${pokemons[i].hp}/${pokemons[i].baseHP}`;
            });
            this.switchButtons.classList.remove('hidden');
            if (menu === 'forcedSwitch') {
                this.switchBackButton.classList.add('hidden');
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
        if (this.engine.playerActivePokemon.hp > 0) {
            const moves = this.engine.playerActivePokemon.moves;
            const moveToUse = !moves.some((move) => move.pp)
                ? -1
                : moves[moveIndex].pp
                    ? moveIndex
                    : undefined;
            if (moveToUse !== undefined) {
                const result = this.engine.selectMove(moveToUse);
                this.handleResult(result);
                this.render();
            }
        }
    }
    handleResult(result) {
        switch (result) {
            case 'Pokemon Select': {
                this.changeMenu('forcedSwitch');
                break;
            }
            case 'Opponent Win': {
                setTimeout(() => alert('Opponent Win!'), 100);
                break;
            }
            case 'Player Win': {
                setTimeout(() => alert('Player Win!'), 100);
                break;
            }
            default: {
                this.changeMenu('main');
                break;
            }
        }
    }
    switchPokemon(pokemonIndex) {
        const selectedPokemon = this.engine.playerTeam[pokemonIndex];
        if (selectedPokemon.hp > 0 &&
            selectedPokemon !== this.engine.playerActivePokemon) {
            this.engine.playerActivePokemon = selectedPokemon;
            Logger.log(`You sent out ${selectedPokemon.name}!`);
            const result = this.engine.selectMove(undefined);
            this.handleResult(result);
            this.render();
        }
        else {
            Logger.log(`${selectedPokemon.name} is invalid to send out.`);
        }
    }
}
//# sourceMappingURL=Renderer.js.map