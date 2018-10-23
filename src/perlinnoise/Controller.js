import Phaser from '../Phaser';
import Line from './Line';
const Controller = (scene) => {

    return {

        simpleNoiseGraph: () => {

            scene.noise  = window.noise;
            scene.noise.seed(Math.random());
    
            scene.points = [];
    
            for(let i = 0; i < 600; i++){
    
                let point = new Phaser.Geom.Point(0,0);
                scene.points.push(point);
            }
            
            scene.graph = scene.add.graphics();
            scene.graph.setDefaultStyles(scene.defaultStyles);
    
            scene.yoff = 100;
            scene.amplitude = 150;
    
            for(let x = 1; x <= scene.points.length; x++) {
    
                // posição y
                let ypos = x + 10;
                // posição x = x
                scene.points[x-1].setTo(x, scene.noise.simplex2(x/100, ypos/100)*scene.amplitude);
                scene.points[x-1].y += 300;
                scene.graph.fillPointShape(scene.points[x-1]);
                scene.yoff += 1;
            }
    
            scene.graph.strokePoints(scene.points);
        },

        simpleNoise2d: (incre = 0.1) => {
            
            scene.scl = 20;
            scene.rows = 600 / scene.scl;
            scene.cols = 600 / scene.scl;
            scene.grid = [];
    
            for(let y = 1; y <= scene.rows; y++){
    
                let ypos = y * scene.scl - scene.scl / 2;
                scene.grid[ypos] = [];
    
                for(let x = 1; x <= scene.cols; x++){
    
                    let xpos = x * scene.scl - scene.scl / 2;
                    scene.grid[ypos][xpos] = {};
                }
    
            }
    
    
            scene.graph = scene.add.graphics();
            scene.graph.setDefaultStyles(scene.defaultStyles);
    
            scene.noise  = window.noise;
            scene.noise.seed(Math.random());
            scene.amplitude = 10;
    
            scene.off1 = 0;
            scene.off2 = 1;
            scene.off3 = 9999;
    
            for(let y in scene.grid)
                for(let x in scene.grid){
    
                    let xTrans = parseFloat(x);
                    let yTrans = parseFloat(y);
                    let xDest = scene.noise.simplex2(scene.off1, scene.off1) * scene.amplitude;
                    let yDest = scene.noise.simplex2(scene.off2, scene.off2) * scene.amplitude;
                    // let xDest = scene.noise.simplex3(scene.off1, scene.off1, scene.off3) * scene.amplitude;
                    // let yDest = scene.noise.simplex3(scene.off2, scene.off2, scene.off3) * scene.amplitude;
    
                    // quanto maior a incrementação menos usave fica
                    scene.off1 += incre;
                    scene.off2 += incre;
                    scene.off3 += incre;
    
                    scene.grid[y][x].line = new Line(scene, xTrans, yTrans, xTrans + xDest, yTrans + yDest);
    
                }
    
            for(let y in scene.grid)
                for(let x in scene.grid){
    
                    scene.graph.strokeLineShape(scene.grid[y][x].line.line)
    
                }
        }
    };
};

export default Controller;