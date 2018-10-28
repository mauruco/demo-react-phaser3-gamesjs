import Phaser from '../Phaser';
import Perc from './Perceptron';
import controller from './controller';

class Perceptron extends Phaser.Scene {

    static config = () => {

        return {
            type: Phaser.AUTO,
            width: 600,
            height: 600,
            backgroundColor: 0x000000,
            scene: [Perceptron]
        };
    };

    constructor() {

        super({key: 'Perceptron'});
    }

    create() {
    
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.graph = this.add.graphics();
        this.ctrl = controller(this, this.width, this.height, this.graph);

        this.points = this.ctrl.makePoints(500);

        this.perc = new Perc();

        this.i = 0;
    }

    update() {

        // this.i++;
        // if(this.i < 60)
        //     return;
        // this.i = 0;

        this.graph.clear();
        this.ctrl.makeFrontier();

        for(let i = 0; i < this.points.length; i++){


            let inputs = [this.points[i].x, this.points[i].y];
            let correctAnswer = this.points[i].correctAnswer;

            // let output = this.perc.guess(inputs);
            let output = this.perc.guessAndTrain(inputs, correctAnswer);

            this.ctrl.drawPoint(inputs, output);
        }
    }
}

export default Perceptron;