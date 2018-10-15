import Phaser from './Phaser';

class SceneLoader {

    hash = '';

    constructor(Starfield, Minesweeper, Snake) {

        let config = {
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
            scene: []
        };

        window.addEventListener('popstate', () => {

            window.location.reload();
        });

        this.hash = window.location.hash;

        if(!this.hash) {

            let div = document.createElement('div');
            div.id = 'sceneselecter';
            div.innerHTML = 'SELECT THE GAME<br />';
            
            let a = document.createElement('a');
            a.href = `${window.location.origin}#starfield`;
            a.innerHTML = 'STARFIELD';
            a.onclick = () => window.location.reload();
            let body = document.getElementsByTagName('body')[0];
            div.appendChild(a);

            a = document.createElement('a');
            a.href = `${window.location.origin}#minesweeper`;
            a.innerHTML = 'MINESWEEPER';
            a.onclick = () => window.location.reload();
            div.appendChild(a);

            a = document.createElement('a');
            a.href = `${window.location.origin}#snake`;
            a.innerHTML = 'SNAKE';
            a.onclick = () => window.location.reload();
            div.appendChild(a);

            body.appendChild(div);
        }

        if(this.hash) {

            let a = document.createElement('a');
            a.id = 'back';
            a.href = window.location.origin;
            a.innerHTML = '<< BACK';
            a.onclick = () => window.location.reload();
            let body = document.getElementsByTagName('body')[0];
            body.appendChild(a);
        }

        if(this.hash === '#starfield') {

            config.scene.push(Starfield);
            new Phaser.Game(config);
        }

        if(this.hash === '#minesweeper') {

            config.scene.push(Minesweeper);
            new Phaser.Game(config);
        }

        if(this.hash === '#snake') {

            config.scene.push(Snake);
            new Phaser.Game(config);
        }
    }
}

export default SceneLoader;