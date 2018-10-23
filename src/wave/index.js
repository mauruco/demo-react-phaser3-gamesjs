import Phaser from '../Phaser';
import Vector from '../Vector';
import Ball from './Ball';

class Wave extends Phaser.Scene {

    static config = () => {

        return {
            type: Phaser.AUTO,
            width: 2400,
            height: 600,
            backgroundColor: 0xFFFFFF,
            scene: [Wave]
        };
    };

    constructor() {
        
        super({key: 'Wave'});
    }

    init() {

        let canvas = document.getElementsByTagName('canvas')[0];
        canvas.style.marginLeft = '-1200px';
    }
    
    preload() {
    }

    create() {

        this.balls = [];
        for(let i = 0; i < 120; i++)
            this.balls.push(new Ball(this, i*30, 300, 10));

        this.frequency = 0.1;
        this.frequency2 = 0.1;
        this.amplitude = 100;
    }
    
    update() {

        let beforeFrequency = this.frequency;


        for(let i = 0; i < this.balls.length; i++) {

            this.balls[i].y = this.amplitude * Math.sin(this.frequency);
            this.frequency += 0.5;
        }

        for(let i = 0; i < this.balls.length; i++) {

            this.balls[i].y += this.amplitude * Math.cos(this.frequency2);
            this.frequency2 += 0.3;
        }
        
        for(let i = 0; i < this.balls.length; i++) {
            this.balls[i].y += 300;
            this.balls[i].update();
        }

        this.frequency = beforeFrequency + 0.101;
        this.frequency2 = beforeFrequency + 0.102;
    }
}

export default Wave;