import Phaser from './Phaser';

class Debuger extends Phaser.Scene {

    static config = () => {

        return {
            type: Phaser.AUTO,
            width: 600,
            height: 600,
            backgroundColor: 0xEEEEEE,
            scene: [Debuger],
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { y: 500 }
                }
            }
        };
    };

    constructor() {

        super({key: 'Debuger'});
    }

    preload() {

        this.load.image('block', 'assets/success_1.png');
    }

    create() {

        let block = this.physics.add.image(400, 100, 'block');

        block.setVelocity(100, 200);
        block.setBounce(1, 1); // faz ao colidir, refletir. Se não colide e fica colado a chão/parede
        block.setCollideWorldBounds(true);

        this.txtFps = this.add.text(10, 10, 'fps: 0', { fontSize: '10px', fill: '#000' });
        this.timeElapsed = this.add.text(10, 25, 'time: 0', { fontSize: '10px', fill: '#000' });
        this.delta = this.add.text(10, 40, 'delta: 0', { fontSize: '10px', fill: '#000' });
        // this.delta2 = this.add.text(10, 55, 'delta2: 0', { fontSize: '10px', fill: '#000' });
    }

    update(time, delta) {

        this.txtFps.setText('fps: '+this.game.loop.actualFps);
        this.timeElapsed.setText('time: '+time);
        this.delta.setText('delta: '+delta);
        // this.delta2.setText('delta2: '+time/this.game.loop.actualFps);
    }
}

export default Debuger;