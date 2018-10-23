import Phaser from '../Phaser';
import Vector from '../Vector';

class Particle extends Vector {

    constructor(scene, x, y) {

        super(x, y);
        this.scene = scene;
        this.velocity = new Vector(0,0);
        this.acceleration = new Vector(0,0);
        this.particle = new Phaser.Geom.Point(0,0);
    }

    follow(scl, grid) {

        let x = Math.floor(this.x / scl)*scl;
        let y = Math.floor(this.y / scl)*scl;

        if(x >= 600)
            x = 0;
        if(y = 600)
            y = 0;
        if(x < 0)
            x = 580;
        if(y < 0)
            y = 580;

        // console.log(grid[x][y].force);

        this.acceleration.sub(grid[x][y].force);
    }

    update() {

        this.velocity.add(this.acceleration);
        this.velocity.limit(3);

        if(this.x > this.scene.width)
            this.x = 0;
        if(this.x < 0)
            this.x = this.scene.width;
        if(this.y > this.scene.height)
            this.y = 0;
        if(this.y < 0)
            this.y = this.scene.height;

        this.add(this.velocity);
        this.acceleration.mult(0);
        this.particle.setTo(this.x, this.y);
    }
}

export default Particle;