import Phaser from '../Phaser';
import Vector from '../Vector';

class Particle extends Vector {

    constructor(scene, x, y) {

        super(x, y);
        this.scene = scene;
        this.velocity = new Vector(0,0);
        this.acceleration = new Vector(0,0);
        this.particle = new Phaser.Geom.Point(x, y);
    }

    reset(x, y) {

        this.x = x;
        this.y = y;
        this.velocity = new Vector(0,0);
        this.acceleration = new Vector(0,0);
        this.particle.setTo(x,y);
    }

    follow(grid, scl) {

        let x = Math.floor(this.x / scl)*scl - scl/2;
        let y = Math.floor(this.y / scl)*scl - scl/2;
        
        if(x === - (this.scene.scl/2))
            x = this.scene.width - (this.scene.scl/2);
        if(y === - (this.scene.scl/2))
            y = this.scene.height - (this.scene.scl/2);
        if(x === this.scene.width + (this.scene.scl/2))
            x = (this.scene.scl/2);
        if(y === this.scene.height + (this.scene.scl/2))
            y = (this.scene.scl/2);
        
        this.acceleration.add(grid[x][y].line.force);
        this.update();
    }

    update() {

        this.acceleration.normalize();
        this.acceleration.mult(0.01);

        // console.log(this.acceleration);

        this.velocity.add(this.acceleration);
        this.velocity.limit(1);

        if(this.x > this.scene.width - (this.scene.scl/2))
            this.x = (this.scene.scl/2);
        if(this.x < (this.scene.scl/2))
            this.x = this.scene.width - (this.scene.scl/2);
        if(this.y > this.scene.height - (this.scene.scl/2))
            this.y = (this.scene.scl/2);
        if(this.y < (this.scene.scl/2))
            this.y = this.scene.height - (this.scene.scl/2);

        this.add(this.velocity);
        this.acceleration.mult(0);
        this.particle.setTo(this.x, this.y);
        this.scene.pointGraph.fillPointShape(this.particle, 5);
    }
}

export default Particle;