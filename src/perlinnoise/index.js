import Phaser from '../Phaser';
import Controller from './Controller';
import Line from './Line';
import Particle from './Particle';
import { random } from '../Helpers';
import './PerlinNoise.js';

class PerlinNoise extends Phaser.Scene {

    static config = () => {

        return {
            type: Phaser.AUTO,
            width: 600,
            height: 600,
            backgroundColor: 0xFFFFFF,
            scene: [PerlinNoise]
        };
    };

    defaultStyles = {lineStyle: {width: 1, color: 0x999999, alpha: 1}, fillStyle: { color: 0x000000, alpha: 1}};

    constructor() {
        
        super({key: 'PerlinNoise'});
    }

    init() {
    }
    
    preload() {
    }

    create() {

        this.width = 600;
        this.height = 600;

        this.noise  = window.noise;
        this.noise.seed(Math.random());

        this.graph = this.add.graphics();
        this.graph.setDefaultStyles(this.defaultStyles);

        this.Ctrl = Controller(this);
        // this.Ctrl.simpleNoiseGraph();
        this.Ctrl.simpleNoise3d(0.1);
        this.Ctrl.simpleNoise3dUpdate();

        this.particles = [];

        for(let i = 0; i < 100; i++)
            this.particles.push(new Particle(this, random(0, 600), random(0, 600)));

        
        
    }
    
    update() {
        
        this.graph.clear();
        // this.Ctrl.simpleNoiseGraphUpdate();
        this.Ctrl.simpleNoise3dUpdate();
        
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].acceleration.add({x: 0.01, y: 1});

            this.particles[i].follow(this.scl, this.grid);
            this.particles[i].update();
            this.graph.fillPointShape(this.particles[i].particle, 5);
        }
    }
}

export default PerlinNoise;