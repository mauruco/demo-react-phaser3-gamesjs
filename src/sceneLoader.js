import Phaser from './Phaser';
import Starfield from './starfield';
import Minesweeper from './minesweeper';
import Snake from './snake';
import Brick from './brick';
import Colorpicker from './colorpicker';
import Debuger from './Debuger';

export const sceneLoader = () => {

    let hash = window.location.hash;
    let menu = document.getElementById('menu');
    if(!hash){
        
        menu.style.display = 'block';
        let body = document.getElementsByTagName('body')[0];
        body.style.backgroundImage = 'url("/assets/Phaser-Logo-Small.png")';
    }

    if(hash === '#debuger')
        new Phaser.Game(Debuger.config());
    
    if(hash === '#starfield') 
        new Phaser.Game(Starfield.config());
    
    if(hash === '#minesweeper')
        new Phaser.Game(Minesweeper.config());
    
    if(hash === '#snake')
        new Phaser.Game(Snake.config());
    
    if(hash === '#colorpicker')
        new Phaser.Game(Colorpicker.config());
    
    if(hash === '#brick')
        new Phaser.Game(Brick.config()); 
}
