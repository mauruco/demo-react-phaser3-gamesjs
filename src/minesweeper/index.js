import Phaser from '../Phaser';
import Controller from './Controller';


class Minesweeper extends Phaser.Scene {

    worldWidth = 0;
    worldHeight = 0;
    boomWidth = 30;
    boomHeight = 30;
    posX = [];
    posY = [];
    grid = []; // [y][x]
    totalBoombs = 20;
    totalPositions = 0;

    init(params) {

        if(!params || !params.totalBoombs)
            return;

        this.totalBoombs = params.totalBoombs;
    }
    
    preload() {
        
        this.load.image('empty', 'assets/minesweeper/grid.png');
        this.load.image('boomb', 'assets/minesweeper/bomb.png');
        this.load.image('ready', 'assets/minesweeper/ready.png');
        this.load.image('gameover', 'assets/gameover.png');
        this.load.image('success', 'assets/success.png');
    }
    
    create() {

        this.Ctrl = Controller(this);
        this.Ctrl.controllers(this.totalBoombs);

        this.events.addListener('boombsnumberchange', (totalBoombs) => {

            this.scene.restart({totalBoombs});
        });

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