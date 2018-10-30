import Phaser from '../Phaser';
import controller from './controller';
import M from '../Matrix'; 

class Matrix extends Phaser.Scene {
    
    static config = () => {
    
        return {
            type: Phaser.AUTO,
            width: 600,
            height: 600,
            backgroundColor: 0xFFFFFF,
            scene: [Matrix]
        };
    };
    
    constructor() {
    
        super({key: 'Matrix'});
    }

    create() {

        let a = new M(3, 2);
        a.randomize();
        
        let b = new M(3, 2);
        b.randomize();

        a.print();
        b.print();

        let c = M.transpose(a);
        c.print();
        
        let d = M.multiply(c, b);
        
        d.print();
        
    }
}

export default Matrix;