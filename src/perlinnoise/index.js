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

    defaultStyles = {lineStyle: {width: 1, color: 0x999999, alpha: 1}, fillStyle: { color: 0xFFFFFF, alpha: 1}};
    redStyles = {lineStyle: {width: 1, color: 0xFF0000, alpha: 1}, fillStyle: { color: 0xFF0000, alpha: 0.1}};
    greenStyles = {lineStyle: {width: 1, color: 0xFF0000, alpha: 1}, fillStyle: { color: 0x00FF00, alpha: 0.1}};
    blueStyles = {lineStyle: {width: 1, color: 0xFF0000, alpha: 1}, fillStyle: { color: 0x0000FF, alpha: 0.1}};

    constructor() {
        
        super({key: 'Noise'});
    }

    text() {

        let opt = document.createElement('div');
        opt.className = 'opt';
        let body = document.getElementsByTagName('body')[0];
        let span = document.createElement('span');
        span.innerHTML = 'A suavidade de Perlin Noise!'
        opt.appendChild(span);
        body.appendChild(opt);
        
        let canvas = document.getElementsByTagName('canvas')[0];
        canvas = canvas.getBoundingClientRect();
        opt.style.top = (canvas.y - 35)+'px';
        opt.style.left = canvas.x+'px';
        opt.style.right = 'auto';
    }


    create() {

        this.text();

        this.width = 600;
        this.height = 600;
        this.scl = 20;
        this.rows = this.width / this.scl;
        this.cols = this.height / this.scl;
        this.grid = [];
        this.noise = new PerlinNoise();

        this.graph = this.add.graphics();
        this.graph.setDefaultStyles(this.defaultStyles);
        this.pointGraph = this.add.graphics();
        this.pointGraph.setDefaultStyles(this.redStyles);

        this.Ctrl = Controller(this);
        this.Ctrl.simpleNoiseGraph();
        this.Ctrl.simpleNoise3d();
        this.Ctrl.simpleNoise3dUpdate();
        
        this.Ctrl.makeParticles();

        this.Ctrl.updateParticles();
    }
    
    update() {
        
        this.graph.clear();
        this.Ctrl.simpleNoiseGraphUpdate();
        this.Ctrl.simpleNoise3dUpdate();
        this.Ctrl.updateParticles();
    }
}

export default Noise;