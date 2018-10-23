import Phaser from '../Phaser';
import Vector from '../Vector';

class Line extends Vector{

    constructor(scene, xTrans, yTrans, x, y) {

        super(x, y);
        this.sub({x: xTrans, y: yTrans});
        this.xTrans = xTrans;
        this.yTrans = yTrans;
        this.line = new Phaser.Geom.Line(xTrans, yTrans, xTrans + this.x, yTrans + this.y);
    }

    getLine() {

        this.line.setTo(this.xTrans, this.yTrans, this.x, this.y);
        return this.line;
    }

    update() {

    }

    updateGraph() {

    }
}

export default Line;