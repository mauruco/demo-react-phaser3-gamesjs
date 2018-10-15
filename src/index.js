import '../node_modules/phaser/dist/phaser.js';
import Phaser from './Phaser';
import Starfield from './starfield';
import Minesweeper from './minesweeper';
import './index.css';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    backgroundColor: 0xEEEEEE,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [ Minesweeper ]
};

const game = new Phaser.Game(config);
