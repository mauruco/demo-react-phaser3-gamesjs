import Phaser from '../Phaser';
import Controller from './Controller';
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

    defaultStyles = {lineStyle: {width: 1, color: 0x000000, alpha: 1}, fillStyle: { color: 0x000000, alpha: 1}};

    constructor() {
        
        super({key: 'PerlinNoise'});
    }

    init() {
    }
    
    preload() {
    }

    create() {

        this.noise = window.noise;
        this.Ctrl = Controller(this);
        this.Ctrl.simpleNoiseGraph();
        this.Ctrl.simpleNoise2d(0.1);
    }
    
    update() {

    }
}

export default PerlinNoise;