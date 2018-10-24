import Phaser from './Phaser';
import Config from './Config';
import Starfield from './starfield';
import Minesweeper from './minesweeper';
import Snake from './snake';
import Brick from './brick';
import Solar from './solar';
import Debuger from './Debuger';
import Natur from './natur';
import Wave from './wave';
import Noise from './perlinnoise';

const SceneLoader = () => {

    let hash = window.location.hash;

    let goTo = (e, game) => {

        console.log('click')
        e.preventDefault();
        window.location.href = `${Config().url}${game}`;
        window.location.reload();
    };

    let aStar = document.createElement('a');
    aStar.href = '#starfield';
    aStar.innerHTML = 'STARFIELD';
    aStar.addEventListener('click', (e) => goTo(e, '#starfield'));
    
    let aMine = document.createElement('a');
    aMine.href = '#minesweeper';
    aMine.innerHTML = 'MINESWEEPER';
    aMine.addEventListener('click', (e) => goTo(e, '#minesweeper'));
    
    
    let aSnake = document.createElement('a');
    aSnake.href = '#snake';
    aSnake.innerHTML = 'SNAKE';
    aSnake.addEventListener('click', (e) => goTo(e, '#snake'));
    
    let aBrick = document.createElement('a');
    aBrick.href = '#brick';
    aBrick.innerHTML = 'BRICK';
    aBrick.addEventListener('click', (e) => goTo(e, '#brick'));
    
    let aSolar = document.createElement('a');
    aSolar.href = '#solar';
    aSolar.innerHTML = 'SOLAR SYSTEM';
    aSolar.addEventListener('click', (e) => goTo(e, '#solar'));
    
    let aNatur = document.createElement('a');
    aNatur.href = '#naturforce';
    aNatur.innerHTML = 'NATUR FORCE';
    aNatur.addEventListener('click', (e) => goTo(e, '#naturforce'));
    
    let aWave = document.createElement('a');
    aWave.href = '#wave';
    aWave.innerHTML = 'WAVE';
    aWave.addEventListener('click', (e) => goTo(e, '#wave'));

    let aNoise = document.createElement('a');
    aNoise.href = '#noise';
    aNoise.innerHTML = 'PERLIN NOISE';
    aNoise.addEventListener('click', (e) => goTo(e, '#noise'));
    
    let menu = document.createElement('menu');
    let opt = document.createElement('opt');
    let body = document.getElementsByTagName('body')[0];
    
    if(hash === '#debuger')
        new Phaser.Game(Debuger.config());
    
    if(hash === '#starfield') 
        new Phaser.Game(Starfield.config());
    
    if(hash === '#minesweeper')
        new Phaser.Game(Minesweeper.config());
    
    if(hash === '#snake'){
        
        new Phaser.Game(Snake.config()); 
        aSnake.className = 'selected';
        opt.style.display = 'none';
    }
    
    if(hash === '#brick'){
        
        new Phaser.Game(Brick.config()); 
        aBrick.className = 'selected';
        opt.style.display = 'none';
    }
    
    if(hash === '#solar'){
        
        new Phaser.Game(Solar.config()); 
        aSolar.className = 'selected';
        opt.style.display = 'none';
    }
    
    if(hash === '#naturforce')
        new Phaser.Game(Natur.config());
    
    if(hash === '#wave')
        new Phaser.Game(Wave.config());
    
    if(hash === '#noise')
        new Phaser.Game(Noise.config());

    opt.id = 'opt';
    opt.innerHTML = 'OPTIONS<br />';
    menu.id = 'menu';
    menu.innerHTML = 'SELECT THE GAME<br />';
    menu.appendChild(aStar);
    menu.appendChild(aMine);
    menu.appendChild(aSnake);
    // menu.appendChild(aBrick);
    menu.appendChild(aSolar);
    // menu.appendChild(aNatur);
    menu.appendChild(aWave);
    menu.appendChild(aNoise);
    body.appendChild(menu);
    // body.appendChild(opt);
    body.style.backgroundImage = 'url("assets/background.jpg")';
}

export default SceneLoader;