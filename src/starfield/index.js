import Phaser from '../Phaser';

class Starfield extends Phaser.Scene {

    stars = 150;
    worldWidth = 0;
    worldHeight = 0;
    speed = 10;
    distance = 300;
    events = null;

    state = {
        speed: 10,
        stars: []
    };

    static config = () => {

        return {
            type: Phaser.AUTO,
            width: 600,
            height: 600,
            backgroundColor: 0xEEEEEE,
            scene: [Starfield]
        };
    };

    constructor() {

        // scene key
        super({key: 'Starfield'});
    }

    controllers() {

        let opt = document.createElement('div');
        let body = document.getElementsByTagName('body')[0];
        opt.className = 'opt';
        let inline = document.createElement('span');
        inline.className = 'inline';
        inline.innerHTML = 'SPEED:';
        let speedInp = document.createElement('input');
        speedInp.type = 'number';
        speedInp.value = 10;
        speedInp.id = 'starspeed';
        let button = document.createElement('button');
        button.className = 'dark';
        button.innerHTML = 'APPLY';
        this.events = new Phaser.Events.EventEmitter();
        button.onclick = () =>this.events.emit('speedChange', speedInp.value);
        opt.appendChild(inline);
        opt.appendChild(speedInp);
        opt.appendChild(button);
        body.appendChild(opt);
        let canvas = document.getElementsByTagName('canvas')[0];
        canvas = canvas.getBoundingClientRect();
        opt.style.top = (canvas.y - 40)+'px';
        opt.style.left = canvas.x+'px';
        opt.style.right = 'auto';
    }

    random(max, min) {

        return Math.floor(Math.random()*(max-(min)+1)+(min));
    }

    createStars() {
     
        for(let i = 0; i < this.stars; i++){

            // eu crio estrelas tanto em coordenadas positivas como negativas
            let star = {
                color: 0xffffff,
                size: 0.1,
                x: this.random((this.worldWidth / 2), - (this.worldWidth / 2)),
                y: this.random((this.worldHeight / 2), - (this.worldHeight / 2)),
                z: this.random(0, this.worldLength),
                starObj: null,
                line: null
            };

            // star.starObj = this.add.circle(star.x, star.y, star.size, star.color);
            star.starObj = new Phaser.Geom.Circle(star.x, star.y, star.size);

            star.startX = 0;
            star.startY = 0;
            star.resetZ = true;

            star.line = new Phaser.Geom.Line(0, 0, 0, 0);

            this.state.stars.push(star);
        }
    }

    moveStars() {

        this.state.stars.map((star) => {

            // eu crio um aperspective, tanto x como y pecorrem a mesmo distancia
            let perspective = this.distance / (this.distance - star.z);
            
            // aumentando comforme a distancia
            star.size += 0.01;
            
            star.starObj.setTo(star.x * perspective, star.y * perspective, star.size);
            // eu diminuo a distance da estrela por speed
            star.z += parseInt(this.speed);

            if(star.resetZ) {

                star.startX = star.starObj.x;
                star.startY = star.starObj.y;
                star.size = 0.1;
                star.resetZ = false;
            }

            // linhas
            star.line.setTo(star.starObj.x, star.starObj.y, star.startX, star.startY);
            this.graph.strokeLineShape(star.line);

            // console.log(star.starObj);
            this.graph.fillCircleShape(star.starObj);

            // reset to origin
            if(star.z >= 0){

                star.starObj.x = star.x;
                star.starObj.y = star.y;
                star.z = this.random(this.worldLength, 0);
                star.resetZ = true;
                // star.starObj.setScale(1);
            }

            return star;
        });
    }
    
    create() {
        
        this.controllers();
        this.graph = this.add.graphics({ lineStyle: {width: 1, color: 0x4d4d00}, fillStyle: { color: 0xffffff, alpha: 1}});
        this.events.addListener('speedChange', (speed) => {

            this.speed = speed;
        });
        this.worldWidth = this.game.config.width;
        this.worldHeight = this.game.config.height;
        this.worldLength = -1700;
        this.createStars();

        let camera = this.cameras.add(0, 0, this.worldWH, this.worldWH);
        camera.transparent = false;
        camera.setBackgroundColor(0x000000);
        camera.centerOn(0,0);
    }

    update() {
        this.graph.clear();
        this.moveStars();
    }
}

export default Starfield;
