import Phaser from '../Phaser';
import controller from './controller';
import './style.css';
import { mapRange } from '../helpers';

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
        this.bombsNumber =  this.dificulty === 'hard' ? 150 : 40;
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
        this.help = null;
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

        // help
        this.onHelping = false;
        this.drawedPropabilitys = [];
        this.help.addEventListener('click', (e) => {

            e.preventDefault();
            if(!this.firstHit || this.onHelping)
                return;

            this.onHelping = true;
            this.propabilitys = this.ctrl.clearPropabilitys(this.drawedPropabilitys);
            this.cleareds = this.ctrl.getClearedPlaces(this.grid);
            this.propabilitys = this.ctrl.getPropabilitys(this.cleareds);

        });
        
        // grid click
        this.input.on('gameobjectdown', (pointer, obj) => {

            if(this.onHelping)
                return;

            if(!this.firstHit) {

                this.firstHit = true;
                this.ctrl.time();
            }

            this.ctrl.clearSpot(obj, this.grid);
        });
    }

    update() {

        if(!this.onHelping)
            return;

        if(!this.propabilitys.length){

            this.onHelping = false;
            return;
        }

        let style = {
            fontFamily: 'Arial Black,Arial Bold,Gadget,sans-serif',
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#000000',
            stroke: '#000000',
            strokeThickness: 1,
            align: 'center'
        }

        let prop = this.propabilitys.pop();

                    
        let color1   = parseInt(mapRange(prop.number, 0, 100, 0, 255)).toString(16);
        let color2   = parseInt(mapRange(prop.number, 0, 100, 255, 0)).toString(16);

        style.stroke = `#00${color2}00`;
        style.color = `#00${color2}00`;

        if(prop.number >= 50) {

            style.color = `#${color1}0000`;
            style.stroke = `#${color1}0000`;
        }

        this.drawedPropabilitys.push(this.add.text(prop.x-9, prop.y-6, ('  '+prop.number).slice(-3), style));
    }
}

export default Minesweeper;