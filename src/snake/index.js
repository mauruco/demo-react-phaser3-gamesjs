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
    apple = {};
    grape = {};
    cursors = null;
    speed = 8;
    framerate = 0;
    gameOver = false;
    addBody = 0;

    preload() {

        this.load.image('grid', 'assets/snake/grid.png');
        this.load.image('body', 'assets/snake/body.png');
        this.load.image('apple', 'assets/snake/apple.png');
        this.load.image('grape', 'assets/snake/grape.png');
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
        this.apple = this.add.sprite(-this.worldWidth, -this.worldHeight, 'apple');
        this.grape = this.add.sprite(-this.worldWidth, -this.worldHeight, 'grape');
        this.grape.livespan = 0;
        this.grape.show = 0;
        
        this.snake = {
            
            body: [],
            direction: 'left',
            nextDirection: false
        };
        
        this.snake = this.Ctrl.placeSnake(this.snake, this.worldHeight / 2 + this.gridCellHeight / 2, this.worldWidth - this.gridCellWidth / 2);

        this.input.keyboard.on('keydown', (e) => {

            this.snake = this.Ctrl.inputHandler(e, this.snake);
        });
    }

    update() {

        this.framerate++;
        if(this.framerate % this.speed !== 0 || this.gameOver)
            return;

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

        if(this.grape.livespan <= 0){

            this.grape = this.Ctrl.randomPositionFruit(this.snake, this.grape, this.posY, this.posX);
            this.grape.livespan = 30;
        }

        if(this.grape.show 0 && this.grape.livespan > 0){

            if(this.grape.alpha == 0.5)
                this.grape.alpha = 1.0
            else
                this.grape.alpha = 0.5;
                
            this.grape.livespan--;

            if(this.Ctrl.checkCollisionWithFruit(nextPosition, this.grape)){
            
                this.grape.y = -100;
                this.grape.x = -100;
                this.grape.livespan = 0;
                this.grape.alpha = 1.0;
                this.addBody += 3;
            }
        }
        
        if(this.apple.x > 0){
            
            if(this.Ctrl.checkCollisionWithFruit(nextPosition, this.apple)){
                
                this.grape.show++;
                this.apple = this.Ctrl.randomPositionFruit(this.snake, this.apple, this.posY, this.posX);
                this.addBody++;
            }
        }
        
        if(this.addBody){

            this.snake = this.Ctrl.snakeAddBody(this.snake, tailPosition);
            this.addBody--;
        }

        this.snake = this.Ctrl.moveSnake(this.snake, nextPosition);

        let success = this.Ctrl.checkSuccess(this.snake, this.gridCount);

        if(success) {

            this.gameOver = true;
            return this.Ctrl.success(this.worldHeight, this.worldWidth);
        }
    }
}

export default Snake;