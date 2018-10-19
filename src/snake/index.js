import Phaser from '../Phaser';
import Controller from './Controller';

class Snake extends Phaser.Scene {

    worldWH = 0;
    grid = []; // [y][x]
    cell = 20;
    snake = {};
    apple = {};
    grape = {};
    cursors = null;
    gameOver = false;
    addBody = 0;
    points = null;
    ready = false;
    speed = 4.0; // 1-60 (60 == 60fps)
    framerate = 60/this.speed;
    actuelFrame = 0;

    static config = () => {

        return {
            type: Phaser.AUTO,
            width: 600,
            height: 600,
            backgroundColor: 0xEEEEEE,
            scene: [Snake]
        };
    };

    constructor() {

        // scene key
        super('snake');
    }

    preload() {

        this.load.image('grid', 'assets/snake/grid.png');
        this.load.image('body', 'assets/snake/body.png');
        this.load.image('apple', 'assets/snake/apple.png');
        this.load.image('grape', 'assets/snake/grape.png');
        this.load.image('gameover', 'assets/gameover.png');
        this.load.image('success', 'assets/success.png');
        this.load.image('ready', 'assets/ready.png');
    }

    create() {
        
        this.Ctrl = Controller(this);
        this.points = this.Ctrl.createPoints();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.worldWH = this.game.config.width;
        this.grid = this.Ctrl.makeGrid(this.worldWH, this.cell);
        this.gridCount = this.Ctrl.countGrid(this.grid);
        this.apple = this.add.sprite(-this.worldWH, -this.worldWH, 'apple');
        this.grape = this.add.sprite(-this.worldWH, -this.worldWH, 'grape');
        this.grape.livespan = 0;
        this.grape.show = 0;
        
        this.snake = {
            
            body: [],
            direction: 'right',
            nextDirection: 'right'
        };
        
        this.snake = this.Ctrl.snakeAddBody(this.snake, {x: this.cell/2, y: this.cell/2});
        this.apple = this.Ctrl.randomPositionFruit(this.snake, this.apple, this.grid, {x:0, y:0}, {x:0, y:0});

        this.input.keyboard.on('keydown', (e) => {

            this.snake = this.Ctrl.directionHandler(e, this.snake);
        });

        // ready
        this.ready = this.Ctrl.getReady(this.worldWH, (ready) => this.ready = ready);
    }

    update() {

        if(!this.ready || this.gameOver)
            return;

        this.actuelFrame++;
        if(this.actuelFrame !== this.framerate)
            return;

        this.actuelFrame = 1;

        if(this.snake.nextDirection){

            this.snake.direction = this.snake.nextDirection; 
            this.snake.nextDirection = false;
        }

        let nextPosition = this.Ctrl.getNexPosition(this.snake, this.cell);
        let tailPosition = this.Ctrl.getTailPosition(this.snake);

        this.gameOver = this.Ctrl.checkCollisionWithSnakeBody(this.snake, nextPosition) || this.Ctrl.checkCollisionWorld(nextPosition, this.worldWH);

        if(this.gameOver)
            return this.Ctrl.gameOver(this.worldWH);


        if(this.Ctrl.checkCollisionWithFruit(nextPosition, this.apple)){
            
            if(this.grape.livespan <= 0)
                this.grape.show++;
            
            this.apple = this.Ctrl.randomPositionFruit(this.snake, this.apple, this.grid, nextPosition, tailPosition);
            this.addBody++;

            this.speed += 0.04;
            this.framerate = Math.ceil(60 / this.speed);
            if(this.framerate > 10)
                this.framerate = 10;
        }

        this.grape.livespan--;

        if(this.grape.livespan <= 0 ) {

            this.grape.y = -this.worldWH;
            this.grape.x = -this.worldWH;
        }

        if(this.grape.show > 5){

            this.grape = this.Ctrl.randomPositionFruit(this.snake, this.grape, this.grid, nextPosition, tailPosition);
            this.grape.livespan = 30;
            this.grape.show = 0;
        }

        if(this.grape.x)
            this.grape = this.Ctrl.changeAlpha(this.grape);

        if(this.Ctrl.checkCollisionWithFruit(nextPosition, this.grape)){
        
            this.grape.livespan = 0;
            this.grape.show = 0;
            this.grape.alpha = 1.0;
            this.addBody += 5;
        }
        
        if(this.addBody){

            this.points.value++;
            this.snake = this.Ctrl.snakeAddBody(this.snake, tailPosition);
            this.addBody--;
        }
        
        if(this.Ctrl.checkSuccess(this.snake, this.gridCount)) {
            
            this.gameOver = true;
            return this.Ctrl.success(this.worldWH, this.worldWH);
        }

        this.snake = this.Ctrl.moveSnake(this.snake, nextPosition);
    }
}

export default Snake;