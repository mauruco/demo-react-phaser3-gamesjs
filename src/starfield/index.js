import Phaser from '../Phaser';

class Starfield extends Phaser.Scene {

    stars = new Array(100).fill(1);
    worldWidth = 0;
    worldHeight = 0;
    speed = 10;
    distance = 300;
    events = null;

    state = {
        speed: 10,
        stars: []
    };

    controllers() {

        let div = document.createElement('div');
        div.id = 'speed';
        div.innerHTML = 'SPEED CONTROL<br />';
        let inp = document.createElement('input');
        inp.type = 'number';
        inp.value = 10;
        inp.id = 'speedvalue';
        let button = document.createElement('button');
        button.innerHTML = 'APPLY';
        this.events = new Phaser.Events.EventEmitter();
        button.onclick = () => {

            let speed = document.getElementById('speedvalue').value;
            this.events.emit('speedChange', speed);
        };

        div.appendChild(inp);
        div.appendChild(button);
        let body = document.getElementsByTagName('body')[0];
        body.appendChild(div);
    }

    random(max, min) {

        return Math.floor(Math.random()*(max-(min)+1)+(min));
    }

    createStars() {
     
        this.stars.map((_) => {

            // eu crio estrelas tanto em coordenadas positivas como negativas
            let star = {
                color: 0xFF0000,
                size: 1,
                x: this.random((this.worldWidth / 2), - (this.worldWidth / 2)),
                y: this.random((this.worldHeight / 2), - (this.worldHeight / 2)),
                z: this.random(0, this.worldLength),
                starObj: null,
                line: null,
                graphLine: null
            };

            // starObj.x e starObj.y eu traduzo as coodenardas originas para a tela visivel (translate)
            star.starObj = this.add.circle(star.x + (this.worldWidth / 2), star.y + (this.worldHeight / 2), star.size, star.color);

            star.startX = 0;
            star.startY = 0;
            star.resetZ = true;

            star.line = new Phaser.Geom.Line(0, 0, 0, 0);
            star.graphLine = this.add.graphics({ lineStyle: {width: 1, color: 0x000000} });

            this.state.stars.push(star);
        });   
    }

    moveStars() {

        this.state.stars.map((star) => {

            // eu crio um aperspective, tanto x como y pecorrem a mesmo distancia
            let perspective = this.distance / (this.distance - star.z);

            
            // aumentando comforme a distancia
            star.starObj.setScale(perspective*3);
            
            star.starObj.x = (star.x * perspective) + (this.worldWidth / 2);
            star.starObj.y = (star.y * perspective) + (this.worldHeight / 2);
            // eu diminuo a distance da estrela por speed
            star.z += parseInt(this.speed);

            if(star.resetZ) {

                star.startX = star.starObj.x;
                star.startY = star.starObj.y;
                star.resetZ = false;
            }

            // linhas
            star.graphLine.destroy();
            star.line.setTo(star.starObj.x, star.starObj.y, star.startX, star.startY);
            star.graphLine = this.add.graphics({ lineStyle: {width: 1, color: 0x000000} });
            star.graphLine.strokeLineShape(star.line);


            // reset to origin
            if(star.z >= 0){

                // sempre traduzindo ascoordenadas originais para a tela visivel (translate)
                star.starObj.x = star.x + (this.worldWidth / 2);
                star.starObj.y = star.y + (this.worldHeight / 2);
                star.z = this.random(this.worldLength, 0);
                star.resetZ = true;
                star.starObj.setScale(1);
            }
        });
    }
    
    create() {
        
        this.controllers();
        this.events.addListener('speedChange', (speed) => {

            this.speed = speed;
        });
        this.worldWidth = this.game.config.width;
        this.worldHeight = this.game.config.height;
        this.worldLength = -1700;
        this.createStars();
    }

    update() {

        this.moveStars();
    }
}

export default Starfield;
