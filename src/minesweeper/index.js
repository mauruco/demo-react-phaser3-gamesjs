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

        let dificulty = window.location.search;
        dificulty = dificulty === '?hard' ? 'hard' : 'easy';
        let width = dificulty !== 'hard' ? 600 : 1350;
        let height = dificulty !== 'hard' ? 600 : 750;

        return {
            type: Phaser.AUTO,
            width: width,
            height: height,
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

        this.load.image('gameover', 'assets/gameover.png');
        this.load.image('success', 'assets/success.png');
        this.load.multiatlas('slice', 'assets/minesweeper/slice.json', 'assets/minesweeper/');
    }
    
    create() {

        this.dificulty = window.location.search === '?hard' ? 'hard' : 'easy';
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.scl = 30;
        this.imgScl = 0.5;
        this.graph = this.add.graphics();
        this.mouse = this.input.mouse;
        this.ctrl = controller(this);
        this.grid = this.ctrl.makeGrid();
        // place bombs
        this.grid = this.ctrl.placeBombs(this.grid, this.dificulty === 'hard' ? 250 : 10);
        // count bombs
        this.grid = this.ctrl.countBombs(this.grid);

        // this.ctrl.loopThrough(this.grid, (obj) => {

        //     return this.ctrl.placeBoombs();
        // });

        this.input.on('gameobjectdown',(pointer, obj) => {

            let options = { ...obj.options };
            let x = obj.x;
            let y = obj.y;
            obj.destroy();
            
            if(!options.isBomb)
                this.ctrl.addEmpty(x, y, options);

            if(!options.isBomb && options.bombs)
                this.ctrl.addNumber(x, y, options.bombs);

            if(!options.isBomb && !options.bombs)
                this.ctrl.clearAll();

            if(options.isBomb)
                this.ctrl.gameOver(x,y, this.grid);
        });



        // this.mouse.on

        // console.log(this.mouse);
        // this.canvas = document.getElementsByTagName('canvas')[0];

        // console.log(this.canvas)
        // console.log(this.game.canvas)

        // this.game.canvas.width = 1350;
        // this.game.canvas.height = 1350;
        // this.game.canvas.style = {};
        // this.game.config.width = 750;
        // this.game.config.height = 750;

        // this.width = '1350px';
        // this.height = '750px';

        // this.width = 1000;

        // hard 1350 x 750

        // let img = this.add.image(50, 50, 'slice', 'button.png');
        // img.setScale(0.5,0.5);
        // console.log(this)

        // this.ctrl = controller(this);
        // this.ctrl.controllers(this.totalBoombs);
        // this.worldWidth = this.game.config.width;
        // this.worldHeight = this.game.config.height;
        // this.posY = this.ctrl.makePosY(this.boomHeight, this.worldHeight);
        // this.posX = this.ctrl.makePosX(this.boomWidth, this.worldWidth);
        // this.grid = this.ctrl.makeGrid(this.posY, this.posX);
        // this.grid = this.ctrl.placeSprites(this.grid, {
            
        //     x: null,
        //     y: null,
        //     type: null,
        //     boombsAllround: 0,
        //     clear: false
        // });
        // this.totalPositions = this.ctrl.countPositions(this.grid);
        // this.grid = this.ctrl.placeBoombs(this.grid, this.posY, this.posX, this.totalBoombs);
        // this.grid = this.ctrl.countBoombsAllround(this.grid, this.boomWidth, this.boomHeight);
        // this.grid = this.ctrl.attachEvent(this.grid, (sprite) => {

        //     if(sprite.state.type === 'boomb')
        //         return this.ctrl.gameOver(this.grid, this.worldHeight, this.worldWidth);

        //     this.ctrl.clearSpace(sprite.state.y, sprite.state.x, this.grid, this.totalPositions, this.boomHeight, this.boomWidth);

        //     if(this.totalPositions - this.totalBoombs === 0)
        //         return this.ctrl.success(this.grid, this.worldHeight, this.worldWidth);
        // });
    }
}

export default Minesweeper;