import '../node_modules/phaser/dist/phaser.js';
import Starfield from './starfield';
import Minesweeper from './minesweeper';
import Snake from './snake';
import SceneLoader from './SceneLoader';
import './index.css';

new SceneLoader(Starfield, Minesweeper, Snake);


