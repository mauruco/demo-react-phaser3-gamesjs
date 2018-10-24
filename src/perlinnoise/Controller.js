import Phaser from '../Phaser';
import Line from './Line';
import Particle from './Particle';
import { random } from '../Helpers';

const Controller = (scene) => {

    return {

        simpleNoiseGraph: () => {

            scene.points = [];

            let yoff = 0.01;

            scene.amplitude = 200;

            for(let i = 0; i < scene.width; i++){

                let point = {
                    
                    yoff: scene.noise.noise2d(0.01, yoff),
                    point: new Phaser.Geom.Point(0,0)
                }

                scene.points.push(point);
                yoff += 0.01;
            }
        },

        simpleNoiseGraphUpdate: () => {

            let first = scene.points.shift();

            first.yoff = scene.points[scene.points.length-1].yoff + 0.01;

            scene.points.push(first);

            for(let x = 0; x < scene.points.length; x++) {

                let y =  scene.noise.noise2d(0.01, scene.points[x].yoff);

                scene.points[x].point.setTo(x, y * scene.amplitude + scene.height / 2);
                scene.graph.fillPointShape(scene.points[x].point);
            }
    
            scene.graph.strokePoints(scene.points);
        },

        simpleNoise3d: () => {
    
            for(let y = 0; y < scene.rows; y++){
        
                let ypos = y * scene.scl + scene.scl / 2;
                scene.grid[ypos] = [];
    
                for(let x = 0; x < scene.cols; x++){
    
                    let xpos = x * scene.scl + scene.scl / 2;
                    scene.grid[ypos][xpos] = {};
                }
            }
    
            let xoff = random(1, 9) / 10;
            let yoff = random(1, 9) / 10;
            let zoff = random(1, 9) / 10;
    
            for(let y in scene.grid){
                for(let x in scene.grid){

                    scene.grid[y][x] = {

                        xoff: xoff,
                        yoff: yoff,
                        zoff: zoff,
                        line: new Line(scene, parseFloat(x), parseFloat(y), parseFloat(x), parseFloat(y))
                    };
                    xoff += 0.1;
                }
                yoff += 0.1;
            }
        },

        simpleNoise3dUpdate: (zoff) => {
       
            for(let y in scene.grid){
                for(let x in scene.grid){

                    let z = zoff;
                    if(!zoff) z = scene.grid[y][x].zoff;

                    // let angle = scene.noise.noise3d(scene.grid[y][x].xoff, scene.grid[y][x].yoff, z) * Math.PI * Math.PI;
                    // let angle = scene.noise.noise3d(scene.grid[y][x].xoff, scene.grid[y][x].yoff, z) * Math.PI;
                    let angle = scene.noise.noise3d(scene.grid[y][x].xoff, scene.grid[y][x].yoff, z) * 2;
                    let xdest = 10 * Math.cos(angle);
                    let ydest = 10 * Math.sin(angle);

                    scene.grid[y][x].zoff += 0.01;

                    scene.grid[y][x].line.update(xdest, ydest);    
                }
            }
        },

        makeParticles: () => {

            scene.pcount = 0;
            scene.particles = [];
            for(let i = 0; i < 100; i++)
                scene.particles.push(new Particle(scene, random(0, scene.width), random(0, scene.height)));
        },

        resetparticles: () => {

            scene.i = 0;
            let colors = [];
            colors[0] = scene.redStyles;
            colors[1] = scene.greenStyles;
            colors[2] = scene.blueStyles;
            colors[3] = scene.redStyles;
            colors[4] = scene.greenStyles;
            colors[5] = scene.blueStyles;
            colors[6] = scene.redStyles;
            colors[7] = scene.greenStyles;
            colors[8] = scene.blueStyles;
            colors[9] = scene.redStyles;
            colors[10] = scene.greenStyles;
            colors[11] = scene.blueStyles;
    
            scene.pointGraph.setDefaultStyles(colors[random(0,11)]);
    
            for(let i = 0; i < 100; i++)
                scene.particles[i].reset(random(0, scene.width), random(0, scene.height));
        },

        updateParticles: () => {

            scene.pcount++;
        
            if(scene.pcount >= 480){

                scene.Ctrl.resetparticles();
                scene.pcount = 0;
            }
    
            for(let i = 0; i < scene.particles.length; i++)
                scene.particles[i].follow(scene.grid, scene.scl);
        }
    };
};

export default Controller;