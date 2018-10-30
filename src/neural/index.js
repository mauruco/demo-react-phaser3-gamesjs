import Phaser from '../Phaser';
import { inspect, print } from '../helpers';
import controller from './controller';
import NeuralNetwork from './NeuralNetwork'; 
import M from '../Matrix'; 

class Neural extends Phaser.Scene {
    
    static config = () => {
    
        return {
            type: Phaser.AUTO,
            width: 600,
            height: 600,
            backgroundColor: 0xFFFFFF,
            scene: [Neural]
        };
    };
    
    constructor() {
    
        super({key: 'NeuralNetwork'});
    }

    create() {

        this.nn = new NeuralNetwork(2, 2, 2);
        // let output = this.nn.feedforward([1, 0], false);
        // print(output.data);

        this.nn.train([1,0], [2,2]);

        // print('output');

    }
}

export default Neural;