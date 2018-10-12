import Phaser from '../Phaser';
import Stars from './Stars';

class Scene extends Phaser.Scene {

    stars = new Array(100).fill(1);
    wordlCenterX = 0;
    wordlCenterY = 0;
    speed = 10;
    color = 0xFF0000;
    distance = 300;

    state = {
        speed: 10,
        stars: []
    };
    
    preload() {
    }
    
    logMethods(obj) {

        for(let m in obj)
            if(typeof obj[m] == 'function')
                console.log(m);
    }
    
    create() {
        
        this.logMethods(new Phaser.Geom.Line(-10, -10, -20, -20));
        this.init();
        this.createStars();
    }

    update() {

        this.moveStars();

    }

    random(max, min) {

        return Math.floor(Math.random()*(max-(min)+1)+(min));
    }

    init() {

        this.worldWidth = this.game.config.width;
        this.worldHeight = this.game.config.height;
        this.worldLength = -1700;
        this.wordlCenterX = this.game.config.width / 2;
        this.wordlCenterX = this.game.config.width / 2;
        this.wordlCenterY = this.game.config.height / 2;
    }

    createStars() {
     
        this.stars.map((_) => {

            // eu crio estrelas tanto em coordenadas positivas como negativas
            let star = {
                color: 0xFF0000,
                size: 1,
                x: this.random(this.wordlCenterX, -this.wordlCenterX),
                y: this.random(this.wordlCenterY, -this.wordlCenterY),
                z: this.random(0, this.worldLength),
                starObj: null,
                line: null,
                graphLine: null
            };

            // starObj.x e starObj.y eu traduzo as coodenardas originas para a tela visivel (translate)
            star.starObj = this.add.circle(star.x + this.wordlCenterX, star.y + this.wordlCenterY, star.size, this.color);

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
            
            star.starObj.x = (star.x * perspective) + this.wordlCenterX;
            star.starObj.y = (star.y * perspective) + this.wordlCenterY;
            // eu diminuo a distance da estrela por speed
            star.z += this.speed;

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
                star.starObj.x = star.x + this.wordlCenterX;
                star.starObj.y = star.y + this.wordlCenterY;
                star.z = this.random(this.worldLength, 0);
                star.resetZ = true;
                star.starObj.setScale(1);
            }
        });
    }
}

export default Scene;
