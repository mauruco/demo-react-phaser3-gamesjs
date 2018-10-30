import Phaser from '../Phaser';
import { inspect, print } from '../helpers';
import controller from './controller';
import NeuralNetwork from './NeuralNetwork'; 
import M from '../Matrix'; 
import Matrix from '../Matrix';

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

        this.nn = new NeuralNetwork(2, 2, 1, 1);

        
        // this.nn.train([0,1], [1]);
        this.i = 0;
    }
    
    update() {
        
        this.i++;
        if(this.i < 60)
        return;
        this.i = 0;

        this.nn.train([0,1], [1]);
    }
}

export default Neural;