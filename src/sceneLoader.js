import Phaser from './Phaser';
import Starfield from './starfield';
import Minesweeper from './minesweeper';
import Snake from './snake';
import Brick from './brick';
import Solar from './solar';
import Debuger from './Debuger';
import Natur from './natur';
import Wave from './wave';
import Noise from './perlinnoise';
import Supershape from './supershape';
import Colorpicker from './colorpicker';
import Display from './display';
import Pathfinderfluid from './pathfinderfluid';
import Perceptron from './perceptron';
import SupervisedLearning from './supervisedlearning';

export const sceneLoader = () => {

    let hash = window.location.hash;
    let menu = document.getElementById('menu');
    if(!hash)
        menu.style.display = 'block';

    if(hash === '#debuger')
        new Phaser.Game(Debuger.config());
    
    if(hash === '#starfield') 
        new Phaser.Game(Starfield.config());
    
    if(hash === '#minesweeper')
        new Phaser.Game(Minesweeper.config());
    
    if(hash === '#snake')
        new Phaser.Game(Snake.config());
    
    if(hash === '#brick')
        new Phaser.Game(Brick.config()); 
    
    if(hash === '#solar')
        new Phaser.Game(Solar.config()); 
    
    if(hash === '#naturforce')
        new Phaser.Game(Natur.config());
    
    if(hash === '#wave')
        new Phaser.Game(Wave.config());
    
    if(hash === '#noise')
        new Phaser.Game(Noise.config());
    
    if(hash === '#supershape')
        new Phaser.Game(Supershape.config());

    if(hash === '#colorpicker')
        new Phaser.Game(Colorpicker.config());

    if(hash === '#display')
        new Phaser.Game(Display.config());

    if(hash === '#pathfinderfluid')
        new Phaser.Game(Pathfinderfluid.config());

    if(hash === '#perceptron')
        new Phaser.Game(Perceptron.config());

    if(hash === '#supervisedlearning')
        new Phaser.Game(SupervisedLearning.config());
}