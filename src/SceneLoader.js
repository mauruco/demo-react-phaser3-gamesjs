import Phaser from './Phaser';

class SceneLoader {

    hash = '';

    constructor(Starfield, Minesweeper, Snake) {

        // physics: {
        //     default: 'arcade',
        //     arcade: {
        //         gravity: { y: 0 }
        //     }
        // },
        let config = {
            type: Phaser.AUTO,
            width: 600,
            height: 600,
            backgroundColor: 0xEEEEEE,
            scene: []
        };

        window.addEventListener('popstate', () => {

            window.location.reload();
        });

        this.hash = window.location.hash;
        
        let aStar = document.createElement('a');
        aStar.href = `${window.location.origin}#starfield`;
        aStar.innerHTML = 'STARFIELD';
        aStar.onclick = () => window.location.reload();
        
        let aMine = document.createElement('a');
        aMine.href = `${window.location.origin}#minesweeper`;
        aMine.innerHTML = 'MINESWEEPER';
        aMine.onclick = () => window.location.reload();
        
        let aSnake = document.createElement('a');
        aSnake.href = `${window.location.origin}#snake`;
        aSnake.innerHTML = 'SNAKE';
        aSnake.onclick = () => window.location.reload();
        
        let menu = document.createElement('menu');
        let opt = document.createElement('opt');
        let body = document.getElementsByTagName('body')[0];
        
        if(this.hash === '#starfield') {
            
            aStar.style.backgroundColor = '#EEEEEE';
            config.scene.push(Starfield);
            new Phaser.Game(config);
        }
        
        if(this.hash === '#minesweeper') {
            
            aMine.style.backgroundColor = '#EEEEEE';
            config.scene.push(Minesweeper);
            new Phaser.Game(config);
            setTimeout(()=>{

                let canvas = document.getElementsByTagName('canvas')[0];
                canvas.className = 'canvas-border';
            });
        }
        
        if(this.hash === '#snake') {
            
            aSnake.style.backgroundColor = '#EEEEEE';
            config.scene.push(Snake);
            new Phaser.Game(config);
            setTimeout(()=>{

                let canvas = document.getElementsByTagName('canvas')[0];
                canvas.className = 'canvas-border';
            });
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
}

export default SceneLoader;