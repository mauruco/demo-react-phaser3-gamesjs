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

        this.nn = new NeuralNetwork(2, 2, 2, 0.1);

        console.table(this.nn.guess([2,4]));
        
        this.nn.weightsHiddensGiveToInputs.data = [];
        this.nn.weightsHiddensGiveToInputs.data[0] = [];
        this.nn.weightsHiddensGiveToInputs.data[1] = [];
        this.nn.weightsHiddensGiveToInputs.data[0][0] = 0.48596632188188493;
        this.nn.weightsHiddensGiveToInputs.data[0][1] = 3.1394189238529204;
        this.nn.weightsHiddensGiveToInputs.data[1][0] = 0.13955427819597682;
        this.nn.weightsHiddensGiveToInputs.data[1][1] = 3.063539928448675;
        
        this.nn.weightsOutputsGiveToHiddens.data = [];
        this.nn.weightsOutputsGiveToHiddens.data[0] = [];
        this.nn.weightsOutputsGiveToHiddens.data[1] = [];
        this.nn.weightsOutputsGiveToHiddens.data[0][0] = 3.4509283733623426;
        this.nn.weightsOutputsGiveToHiddens.data[0][1] = 2.246673466171543;
        this.nn.weightsOutputsGiveToHiddens.data[1][0] = 3.093292158574846;
        this.nn.weightsOutputsGiveToHiddens.data[1][1] = 3.150566420585809;
        
        this.nn.biasH.data = [];
        this.nn.biasH.data[0] = [0.8797173665351443];
        this.nn.biasH.data[1] = [1.7428401690841224];

        
        this.nn.biasO.data = [];
        this.nn.biasO.data[0] = [4.593597483858505];
        this.nn.biasO.data[1] = [4.780606968431422];
        
        console.table(this.nn.guess([2,4]));
        console.table(this.nn.guess([-99,-51]));

        // 0.48596632188188493
        // 3.1394189238529204
        // 0.13955427819597682
        // 3.063539928448675

        // 3.4509283733623426
        // 2.246673466171543
        // 3.093292158574846
        // 3.150566420585809

        // 0.8797173665351443
        // 1.7428401690841224

        // 4.593597483858505
        // 4.780606968431422
        
        this.i = 0;
        this.learn = 2000;
    }
    
    update() {
        
        this.i++;
        // if(this.i < 10)
        // return;
        // this.i = 0;

        // if(this.i % 100)
        //     console.log(this.learn);

        // this.nn.train([2,4], [50, 100]);

        // this.learn--;
        // if(!this.learn){

        //     this.nn.weightsHiddensGiveToInputs.print();
        //     this.nn.weightsOutputsGiveToHiddens.print();
        //     this.nn.biasH.print();
        //     this.nn.biasO.print();
        // }

        // print(this.nn.train([2,4], [50, 100]));
    }
}

export default Neural;