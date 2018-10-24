import Phaser from '../Phaser';

class Line{

    constructor(scene, x, y, dirX, dirY) {

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.force = {x: dirX, y: dirY};
        this.line = new Phaser.Geom.Line(this.x, this.y, this.x + dirX, this.y + dirY);
        this.point = new Phaser.Geom.Point(this.x, this.y);
    }
    
    update(dirX, dirY) {
        
        this.force = {x: dirX, y: dirY};
        this.line.setTo(this.x, this.y, this.x + dirX, this.y + dirY);
        this.scene.graph.strokeLineShape(this.line);
        this.scene.graph.fillPointShape(this.point, 3);
    }
}

export default Line;