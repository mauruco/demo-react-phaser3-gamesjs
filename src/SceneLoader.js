import Phaser from './Phaser';
import Config from './Config';
import Starfield from './starfield';
import Minesweeper from './minesweeper';
import Snake from './snake';
import Debuger from './Debuger';

const SceneLoader = () => {

    window.addEventListener('popstate', () => {

        window.location.reload();
    });

    let hash = window.location.hash;

    let aStar = document.createElement('a');
    aStar.href = `${Config().url}#starfield`;
    aStar.innerHTML = 'STARFIELD';
    aStar.onclick = () => window.location.reload();
    
    let aMine = document.createElement('a');
    aMine.href = `${Config().url}#minesweeper`;
    aMine.innerHTML = 'MINESWEEPER';
    aMine.onclick = () => window.location.reload();
    
    let aSnake = document.createElement('a');
    aSnake.href = `${Config().url}#snake`;
    aSnake.innerHTML = 'SNAKE';
    aSnake.onclick = () => window.location.reload();
    
    let menu = document.createElement('menu');
    let opt = document.createElement('opt');
    let body = document.getElementsByTagName('body')[0];
    
    if(hash === '#debuger')
        new Phaser.Game(Debuger.config());
    
    if(hash === '#starfield') {
        new Phaser.Game(Starfield.config());
    }
    
    if(hash === '#minesweeper') {
        
        new Phaser.Game(Minesweeper.config());
    }
    
    if(hash === '#snake') {
        
        new Phaser.Game(Snake.config()); 
        aSnake.className = 'selected';
        opt.style.display = 'none';
    }

    opt.id = 'opt';
    opt.innerHTML = 'OPTIONS<br />';
    menu.id = 'menu';
    menu.innerHTML = 'SELECT THE GAME<br />';
    menu.appendChild(aStar);
    menu.appendChild(aMine);
    menu.appendChild(aSnake);
    body.appendChild(menu);
    body.appendChild(opt);
}

export default SceneLoader;