import Logger from './Logger.js';
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
        this.isAnimating = false;
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
        this.playerName.textContent = `${playerPokemon.name} ${this.getPokemonStatus(playerPokemon)}`;
        this.playerHP.textContent = `HP: ${playerPokemon.hp}/${playerPokemon.baseHP}`;
        this.playerHPBar.value = playerPokemon.hp / playerPokemon.baseHP;
        this.playerImage.src = `assets/back/${playerPokemon.name}.png`;
        const opponentPokemon = this.engine.opponentActivePokemon;
        this.opponentName.textContent = `${opponentPokemon.name} ${this.getPokemonStatus(opponentPokemon)}`;
        this.opponentHP.textContent = `HP: ${opponentPokemon.hp}/${opponentPokemon.baseHP}`;
        this.opponentHPBar.value = opponentPokemon.hp / opponentPokemon.baseHP;
        this.opponentImage.src = `assets/front/${opponentPokemon.name}.png`;
    }
    async useMove(moveIndex) {
        if (this.isAnimating || this.engine.playerActivePokemon.hp <= 0)
            return;
        this.isAnimating = true;
        this.disableAllButtons();
        const moves = this.engine.playerActivePokemon.moves;
        const moveToUse = !moves.some((move) => move.pp)
            ? -1
            : moves[moveIndex].pp
                ? moveIndex
                : undefined;
        if (moveToUse !== undefined) {
            const playerPokemonBefore = {
                pokemon: this.engine.playerActivePokemon,
                hp: this.engine.playerActivePokemon.hp,
            };
            const opponentPokemonBefore = {
                pokemon: this.engine.opponentActivePokemon,
                hp: this.engine.opponentActivePokemon.hp,
            };
            const result = this.engine.selectMove(moveToUse);
            const firstPlayer = this.engine.calculateFirstPlayer(this.engine.playerActivePokemon, moves[moveToUse], this.engine.opponentActivePokemon, this.engine.selectOpponentMove());
            await this.animateBattleSequence(firstPlayer, playerPokemonBefore, opponentPokemonBefore, result);
            this.handleResult(result);
            this.render();
        }
        this.isAnimating = false;
        this.enableAllButtons();
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
    getPokemonStatus(pokemon) {
        if (pokemon.isBurned)
            return '🔥';
        if (pokemon.isPoisoned)
            return '☠️';
        if (pokemon.badlyPoisonedStage)
            return '☠️☠️';
        if (pokemon.isFrozen)
            return '❄️';
        if (pokemon.isParalyzed)
            return '⚡';
        if (pokemon.sleepStage)
            return '😴';
        return '';
    }
    async animateBattleSequence(firstPlayer, playerBefore, opponentBefore, result) {
        const battleEndedEarly = result === 'Pokemon Select' ||
            result === 'Player Win' ||
            result === 'Opponent Win';
        if (firstPlayer === 'player') {
            await this.animateAttack(this.playerImage);
            await this.sleep(200);
            if (this.engine.opponentActivePokemon.hp < opponentBefore.hp ||
                (battleEndedEarly &&
                    opponentBefore.pokemon === this.engine.opponentActivePokemon)) {
                await this.animateDamage(this.opponentImage);
                await this.animateHPChange(this.opponentHPBar, this.opponentHP, this.engine.opponentActivePokemon);
            }
            if (this.engine.opponentActivePokemon.hp <= 0) {
                await this.animateFaint(this.opponentImage);
                await this.sleep(500);
                if (this.engine.opponentActivePokemon.hp > 0) {
                    await this.animateSwitchIn(this.opponentImage);
                }
                if (battleEndedEarly) {
                    return;
                }
            }
            if (this.engine.opponentActivePokemon.hp > 0 && !battleEndedEarly) {
                await this.sleep(800);
                await this.animateAttack(this.opponentImage);
                await this.sleep(200);
                if (this.engine.playerActivePokemon.hp < playerBefore.hp) {
                    await this.animateDamage(this.playerImage);
                    await this.animateHPChange(this.playerHPBar, this.playerHP, this.engine.playerActivePokemon);
                }
                if (this.engine.playerActivePokemon.hp <= 0) {
                    await this.animateFaint(this.playerImage);
                    await this.sleep(500);
                }
            }
        }
        else {
            await this.animateAttack(this.opponentImage);
            await this.sleep(200);
            if (this.engine.playerActivePokemon.hp < playerBefore.hp ||
                (battleEndedEarly &&
                    playerBefore.pokemon === this.engine.playerActivePokemon)) {
                await this.animateDamage(this.playerImage);
                await this.animateHPChange(this.playerHPBar, this.playerHP, this.engine.playerActivePokemon);
            }
            if (this.engine.playerActivePokemon.hp <= 0) {
                await this.animateFaint(this.playerImage);
                await this.sleep(500);
                if (this.engine.playerActivePokemon.hp > 0) {
                    await this.animateSwitchIn(this.playerImage);
                }
                if (battleEndedEarly) {
                    return;
                }
            }
            if (this.engine.playerActivePokemon.hp > 0 && !battleEndedEarly) {
                await this.sleep(800);
                await this.animateAttack(this.playerImage);
                await this.sleep(200);
                if (this.engine.opponentActivePokemon.hp < opponentBefore.hp) {
                    await this.animateDamage(this.opponentImage);
                    await this.animateHPChange(this.opponentHPBar, this.opponentHP, this.engine.opponentActivePokemon);
                }
                if (this.engine.opponentActivePokemon.hp <= 0) {
                    await this.animateFaint(this.opponentImage);
                    await this.sleep(500);
                }
            }
        }
    }
    async animateAttack(image) {
        return new Promise((resolve) => {
            image.classList.add('pokemon-attack');
            setTimeout(() => {
                image.classList.remove('pokemon-attack');
                resolve();
            }, 600);
        });
    }
    async animateDamage(image) {
        return new Promise((resolve) => {
            image.classList.add('pokemon-damage');
            setTimeout(() => {
                image.classList.remove('pokemon-damage');
                resolve();
            }, 800);
        });
    }
    async animateHPChange(hpBar, hpText, pokemon) {
        return new Promise((resolve) => {
            const targetValue = pokemon.hp / pokemon.baseHP;
            hpBar.classList.add('hp-bar-animate');
            hpBar.value = targetValue;
            hpText.textContent = `HP: ${pokemon.hp}/${pokemon.baseHP}`;
            setTimeout(() => {
                hpBar.classList.remove('hp-bar-animate');
                resolve();
            }, 800);
        });
    }
    async animateFaint(image) {
        return new Promise((resolve) => {
            image.classList.add('pokemon-faint');
            setTimeout(() => {
                image.classList.remove('pokemon-faint');
                resolve();
            }, 1200);
        });
    }
    async animateSwitchIn(image) {
        return new Promise((resolve) => {
            image.classList.add('pokemon-switch-in');
            setTimeout(() => {
                image.classList.remove('pokemon-switch-in');
                resolve();
            }, 800);
        });
    }
    async animateSwitchOut(image) {
        return new Promise((resolve) => {
            image.classList.add('pokemon-switch-out');
            setTimeout(() => {
                image.classList.remove('pokemon-switch-out');
                resolve();
            }, 600);
        });
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    disableAllButtons() {
        [
            this.moveButton,
            this.switchButton,
            this.move1Button,
            this.move2Button,
            this.move3Button,
            this.move4Button,
            this.moveBackButton,
            this.switch1Button,
            this.switch2Button,
            this.switch3Button,
            this.switch4Button,
            this.switch5Button,
            this.switch6Button,
            this.switchBackButton,
        ].forEach((button) => (button.disabled = true));
    }
    enableAllButtons() {
        [
            this.moveButton,
            this.switchButton,
            this.move1Button,
            this.move2Button,
            this.move3Button,
            this.move4Button,
            this.moveBackButton,
            this.switch1Button,
            this.switch2Button,
            this.switch3Button,
            this.switch4Button,
            this.switch5Button,
            this.switch6Button,
            this.switchBackButton,
        ].forEach((button) => (button.disabled = false));
    }
    async switchPokemon(pokemonIndex) {
        const selectedPokemon = this.engine.playerTeam[pokemonIndex];
        if (selectedPokemon.hp > 0 &&
            selectedPokemon !== this.engine.playerActivePokemon) {
            await this.animateSwitchOut(this.playerImage);
            this.engine.switchPokemon(pokemonIndex);
            this.changeMenu('main');
            await this.animateSwitchIn(this.playerImage);
            this.render();
        }
        else {
            Logger.log(`${selectedPokemon.name} is invalid to send out.`);
        }
    }
}
//# sourceMappingURL=Renderer.js.map