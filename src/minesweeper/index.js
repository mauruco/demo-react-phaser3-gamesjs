import Phaser from '../Phaser';
import Controller from './Controller';


class Minesweeper extends Phaser.Scene {

    worldWidth = 0;
    worldHeight = 0;
    boomWidth = 50;
    boomHeight = 50;
    posX = [];
    posY = [];
    grid = []; // [y][x]
    totalBoombs = 20;
    totalPositions = 0;

    constructor() {

        super();
        this.Ctrl = Controller(this);
    }

    preload() {

        this.load.image('empty', 'assets/minesweeper/square_empty.png');
        this.load.image('boomb', 'assets/minesweeper/square_red.png');
        this.load.image('ready', 'assets/minesweeper/square_green.png');
        this.load.image('gameover', 'assets/minesweeper/gameover.png');
        this.load.image('success', 'assets/minesweeper/success.png');
    }
    
    create() {

        this.worldWidth = this.game.config.width;
        this.worldHeight = this.game.config.height;
        this.posY = this.Ctrl.makePosY(this.boomHeight, this.worldHeight);
        this.posX = this.Ctrl.makePosX(this.boomWidth, this.worldWidth);
        this.grid = this.Ctrl.makeGrid(this.posY, this.posX);
        this.grid = this.Ctrl.placeSprites(this.grid, {
            
            x: null,
            y: null,
            type: null,
            boombsAllround: 0,
            clear: false
        });
        this.totalPositions = this.Ctrl.countPositions(this.grid);
        this.grid = this.Ctrl.placeBoombs(this.grid, this.posY, this.posX, this.totalBoombs);
        this.grid = this.Ctrl.countBoombsAllround(this.grid, this.boomWidth, this.boomHeight);
        this.grid = this.Ctrl.attachEvent(this.grid, (sprite) => {

            if(sprite.state.type === 'boomb')
                return this.Ctrl.gameOver(this.grid, this.worldHeight, this.worldWidth);

            this.Ctrl.clearSpace(sprite.state.y, sprite.state.x, this.grid, this.totalPositions, this.boomHeight, this.boomWidth);

            if(this.totalPositions - this.totalBoombs === 0)
                return this.Ctrl.success(this.grid, this.worldHeight, this.worldWidth);
        });
    }
}

export default Minesweeper;