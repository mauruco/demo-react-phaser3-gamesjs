import Phaser from '../Phaser';
import Controller from './Controller';
import PerlinNoise from './PerlinNoise';

class Noise extends Phaser.Scene {

    static config = () => {

        return {
            type: Phaser.AUTO,
            width: 600,
            height: 600,
            backgroundColor: 0x000000,
            scene: [Noise]
        };
    };

    defaultStyles = {lineStyle: {width: 1, color: 0x000000, alpha: 1}, fillStyle: { color: 0x000000, alpha: 1}};

    constructor() {
        
        super({key: 'Noise'});
    }

    create() {

        
        this.width = 600;
        this.height = 600;
        this.scl = 20;
        this.noise = new PerlinNoise();
        this.invert = false;
        this.count = 0;
        
        this.Ctrl = Controller(this);
        this.Ctrl.text();
        this.grid = this.Ctrl.makeGrid(this.scl, this.width, this.height);

        this.graph = this.add.graphics();
        this.graph.setDefaultStyles(this.defaultStyles);


        this.Ctrl.simpleNoise3d(this.grid, this.graph);
        // this.Ctrl.simpleNoise3dUpdate(this.noise, this.grid, this.invert);
        
        this.particles = this.Ctrl.makeParticles(this.width, this.height);

        this.points = this.Ctrl.simpleNoiseGraph(this.noise, this.width);

        // this.graph.clear();
        // this.Ctrl.perlinNoise(this.noise, this.graph, this.width, this.height);
    }


    update() {
        
        // this.graph.clear();
        // invert force
        if(this.count % 480 === 0) {
            
            this.invert = this.invert ? false : true;
            this.count = 0;
        }
        this.count++;

        this.Ctrl.simpleNoise3dUpdate(this.noise, this.grid, this.invert);
        this.Ctrl.updateParticles(this.particles, this.grid, this.width, this.height, this.scl, this.graph);
        // this.Ctrl.simpleNoiseGraphUpdate(this.noise, this.points, this.graph, this.height, 200);
    }
}

export default Noise;