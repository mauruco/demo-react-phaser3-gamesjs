import Phaser from '../Phaser';
import controller from './controller';
import './style.css';

class Minesweeper extends Phaser.Scene {
    
    static config = () => {

        let dificulty = window.location.search;
        dificulty = dificulty === '?hard' ? 'hard' : 'easy';
        let width = dificulty !== 'hard' ? 600 : 1350;
        let height = dificulty !== 'hard' ? 600 : 750;

        return {
            type: Phaser.AUTO,
            width: width,
            height: height,
            backgroundColor: 0xEEEEEE,
            scene: [Minesweeper]
        };
    };

    constructor() {

        // scene key
        super('minesweeper');
    }

    init(params) {

        if(!params || !params.totalBoombs)
            return;

        this.totalBoombs = params.totalBoombs;
    }
    
    preload() {

        this.load.image('gameover', 'assets/fail_1.png');
        this.load.image('success', 'assets/success_1.png');
        this.load.multiatlas('slice', 'assets/minesweeper/slice.json', 'assets/minesweeper/');
    }
    
    create() {

        this.dificulty = window.location.search === '?hard' ? 'hard' : 'easy';
        this.bombsNumber =  this.dificulty === 'hard' ? 250 : 40;
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.scl = 30;
        this.imgScl = 0.5;
        this.graph = this.add.graphics();
        this.mouse = this.input.mouse;
        this.timeCtrl = null;
        this.timeInterval = null;
        this.smily = null;
        this.bombsCalc = null;
        this.maker = null;
        this.firstHit = false;
        this.totalPlaces = 0 - this.bombsNumber;
        this.ctrl = controller(this);
        this.ctrl.controllers();
        this.grid = this.ctrl.makeGrid(this.totalPlaces);
        // place bombs
        this.grid = this.ctrl.placeBombs(this.grid, this.bombsNumber);
        // count bombs
        this.grid = this.ctrl.countBombs(this.grid);
        
        // marker
        this.marker.addEventListener('click', (e) => {
            
            this.markerActive = this.markerActive ? false : true;
            
            e.target.className = '';
            if(this.markerActive)
            e.target.className = 'active';
        });

        this.input.on('gameobjectdown', (pointer, obj) => {

            if(!this.firstHit) {

                this.firstHit = true;
                this.ctrl.time();
            }

            this.ctrl.clearSpot(obj, this.grid);
        });
    }
}

export default Minesweeper;