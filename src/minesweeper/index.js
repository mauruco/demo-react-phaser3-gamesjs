import Phaser from '../Phaser';
import controller from './controller';


class Minesweeper extends Phaser.Scene {

    worldWidth = 0;
    worldHeight = 0;
    boomWidth = 30;
    boomHeight = 30;
    posX = [];
    posY = [];
    grid = []; // [y][x]
    totalBoombs = 30;
    totalPositions = 0;
    
    static config = () => {

        return {
            type: Phaser.AUTO,
            width: 600,
            height: 600,
            backgroundColor: 0xEEEEEE,
            scene: [Minesweeper]
        };
    };

    constructor() {

        // scene key
        super('minesweeper');
    }

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

        this.ctrl = controller(this);
        this.ctrl.controllers(this.totalBoombs);
        this.worldWidth = this.game.config.width;
        this.worldHeight = this.game.config.height;
        this.posY = this.ctrl.makePosY(this.boomHeight, this.worldHeight);
        this.posX = this.ctrl.makePosX(this.boomWidth, this.worldWidth);
        this.grid = this.ctrl.makeGrid(this.posY, this.posX);
        this.grid = this.ctrl.placeSprites(this.grid, {
            
            x: null,
            y: null,
            type: null,
            boombsAllround: 0,
            clear: false
        });
        this.totalPositions = this.ctrl.countPositions(this.grid);
        this.grid = this.ctrl.placeBoombs(this.grid, this.posY, this.posX, this.totalBoombs);
        this.grid = this.ctrl.countBoombsAllround(this.grid, this.boomWidth, this.boomHeight);
        this.grid = this.ctrl.attachEvent(this.grid, (sprite) => {

            if(sprite.state.type === 'boomb')
                return this.ctrl.gameOver(this.grid, this.worldHeight, this.worldWidth);

            this.ctrl.clearSpace(sprite.state.y, sprite.state.x, this.grid, this.totalPositions, this.boomHeight, this.boomWidth);

            if(this.totalPositions - this.totalBoombs === 0)
                return this.ctrl.success(this.grid, this.worldHeight, this.worldWidth);
        });
    }
}

export default Minesweeper;