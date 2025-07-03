export default class Renderer {
    constructor(engine, playerName, playerHP, playerImage, opponentName, opponentHP, opponentImage) {
        this.engine = engine;
        this.playerName = playerName;
        this.playerHP = playerHP;
        this.playerImage = playerImage;
        this.opponentName = opponentName;
        this.opponentHP = opponentHP;
        this.opponentImage = opponentImage;
    }
    log() {
        console.log(this.engine, this.playerName, this.playerHP, this.playerImage, this.opponentName, this.opponentHP, this.opponentImage);
    }
}
//# sourceMappingURL=Renderer.js.map