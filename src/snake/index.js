import Phaser from '../Phaser';
import Controller from './Controller';

class Snake extends Phaser.Scene {

    worldWidth = 0;
    worldHeight = 0;
    gridCellWidth = 20;
    gridCellHeight = 20;
    posX = [];
    posY = [];
    grid = []; // [y][x]
    snake = {};
    cacke = {};
    cursors = null;
    speed = 8;
    framerate = 0;
    gameOver = false;

    preload() {

        this.load.image('grid', 'assets/snake/grid.png');
        this.load.image('body', 'assets/snake/body.png');
        this.load.image('apple', 'assets/snake/apple.png');
        this.load.image('gameover', 'assets/gameover.png');
        this.load.image('success', 'assets/success.png');
    }

    create() {
        
        this.Ctrl = Controller(this);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.worldWidth = this.game.config.width;
        this.worldHeight = this.game.config.height;
        this.posY = this.Ctrl.makePosY(this.gridCellHeight, this.worldHeight);
        this.posX = this.Ctrl.makePosX(this.gridCellWidth, this.worldWidth);
        this.grid = this.Ctrl.makeGrid(this.posY, this.posX);
        this.gridCount = this.Ctrl.countGrid(this.grid);
        this.cacke = this.add.sprite(-this.worldWidth, -this.worldHeight, 'apple');
        
        this.snake = {
            
            body: [],
            direction: 'left',
            nextDirection: false
        };
        
        this.snake = this.Ctrl.placeSnake(this.snake, this.worldHeight / 2 + this.gridCellHeight / 2, this.worldWidth - this.gridCellWidth / 2);
        this.cacke = this.Ctrl.placeCacke(this.snake, this.cacke, this.posY, this.posX);

        this.input.keyboard.on('keydown', (e) => {

            this.snake = this.Ctrl.inputHandler(e, this.snake);
        });
    }

    update() {

        this.framerate++;
        if(this.framerate % this.speed === 0 && !this.gameOver){

            this.framerate = 0;

            if(this.snake.nextDirection){

                this.snake.direction = this.snake.nextDirection; 
                this.snake.nextDirection = false;
            }

            let nextPosition = this.Ctrl.getNexPosition(this.snake, this.gridCellHeight, this.gridCellWidth);
            let tailPosition = this.Ctrl.getTailPosition(this.snake);

            this.gameOver = this.Ctrl.checkCollisionWithSnakeBody(this.snake, nextPosition) || this.Ctrl.checkCollisionWorld(nextPosition, this.worldHeight, this.worldWidth);         
            if(this.gameOver)
                return this.Ctrl.gameOver(this.worldHeight, this.worldWidth);
            
            let hasEatCacke = this.Ctrl.checkCollisionWithCacke(nextPosition, this.cacke);
            
            this.snake = this.Ctrl.moveSnake(this.snake, nextPosition);
            
            if(hasEatCacke) {
                
                this.cacke = this.Ctrl.placeCacke(this.snake, this.cacke, this.posY, this.posX);
                this.snake = this.Ctrl.snakeAddBody(this.snake, tailPosition);
            }

            let success = this.Ctrl.checkSuccess(this.snake, this.gridCount);

            if(success) {

                this.gameOver = true;
                return this.Ctrl.success(this.worldHeight, this.worldWidth);
            }

        }
    }
}

export default Snake;