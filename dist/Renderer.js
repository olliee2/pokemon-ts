export default class Renderer {
    constructor(engine, playerName, playerHP, playerImage, opponentName, opponentHP, opponentImage, mainButtons, moveButton, switchButton, moveButtons, move1Button, move2Button, move3Button, move4Button, moveBackButton, switchButtons, switch1Button, switch2Button, switch3Button, switch4Button, switch5Button, switch6Button, switchBackButton, battleLog) {
        this.engine = engine;
        this.playerName = playerName;
        this.playerHP = playerHP;
        this.playerImage = playerImage;
        this.opponentName = opponentName;
        this.opponentHP = opponentHP;
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
        moveButton.addEventListener('click', () => {
            this.changeMenu('move');
        });
        switchButton.addEventListener('click', () => {
            this.changeMenu('switch');
        });
        moveBackButton.addEventListener('click', () => {
            this.changeMenu('main');
        });
        switchBackButton.addEventListener('click', () => {
            this.changeMenu('main');
        });
    }
    render() { }
    changeMenu(menu) {
        switch (menu) {
            case 'main':
                this.mainButtons.classList.remove('hidden');
                this.moveButtons.classList.add('hidden');
                this.switchButtons.classList.add('hidden');
                break;
            case 'move':
                this.mainButtons.classList.add('hidden');
                this.moveButtons.classList.remove('hidden');
                this.switchButtons.classList.add('hidden');
                break;
            case 'switch':
                this.mainButtons.classList.add('hidden');
                this.moveButtons.classList.add('hidden');
                this.switchButtons.classList.remove('hidden');
                break;
        }
    }
    log() {
        console.log(this.engine, this.playerName, this.playerHP, this.playerImage, this.opponentName, this.opponentHP, this.opponentImage, this.mainButtons, this.moveButton, this.switchButton, this.moveButtons, this.move1Button, this.move2Button, this.move3Button, this.move4Button, this.moveBackButton, this.switchButtons, this.switch1Button, this.switch2Button, this.switch3Button, this.switch4Button, this.switch5Button, this.switch6Button, this.switchBackButton, this.battleLog);
    }
}
//# sourceMappingURL=Renderer.js.map