import Phaser from '../Phaser';
import controller from './controller';

class Brick extends Phaser.Scene {

    cell = 20;
    grid = []; //grid[y][x]
    worldWH = 600;
    ball = null;
    brickSize = [60,20];

    static config = () => {

        return {
            type: Phaser.AUTO,
            width: 600,
            height: 600,
            backgroundColor: 0xEEEEEE,
            scene: [Brick],
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { y: 0 }
                }
            }
        };
    };

    constructor() {

        // scene key
        super('brick');
    }

    preload() {

        this.load.image('grid', 'assets/brick/grid.png');
        this.load.image('brick', 'assets/brick/brick.png');
        this.load.image('ball', 'assets/brick/ball.png');
        this.load.image('gameover', 'assets/gameover.png');
        this.load.image('success', 'assets/success.png');
        this.load.image('ready', 'assets/ready.png');
    }

    create() {

        this.ctrl = controller(this);
        this.grid = this.ctrl.makeGrid(this.worldWH, this.cell);
        this.bricks = this.ctrl.addBricks(this.worldWH, 100, this.brickSize, 10);
        this.ball = this.ctrl.addBall(this.worldWH / 2, this.worldWH - this.cell - 30, 500, 500);

        this.physics.add.collider(this.ball, this.bricks, (ball, brick) => {
            
            ball.setVelocity(500, 500);
            ball.setGravity(500);
            brick.destroy()
        });
    }

    update() {

    }
}

export default Brick;