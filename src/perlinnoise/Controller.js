import Phaser from '../Phaser';
import Line from './Line';
import Vector from '../Vector';

const Controller = (scene) => {

    return {

        simpleNoiseGraph: () => {

            scene.points = [];

            for(let i = 0; i < 600; i++){
    
                let point = new Phaser.Geom.Point(0,0);
                scene.points.push(point);
            }
            
    
            scene.xff = 300;
            scene.yff = 0;
            scene.amplitude = 50;
            scene.height = 600;
        },

        simpleNoiseGraphUpdate: () => {

            for(let x = 0; x < scene.points.length; x++) {

                let y =  scene.noise.simplex2(scene.xff, scene.yff);
    
                scene.points[x].setTo(x, y * scene.amplitude + scene.height / 2);
                scene.graph.fillPointShape(scene.points[x]);
                scene.yff += 0.01;
            }
    
            scene.graph.strokePoints(scene.points);
        },

        simpleNoise3d: () => {

            scene.scl = 20;
            scene.rows = 600 / scene.scl;
            scene.cols = 600 / scene.scl;
            scene.grid = [];
    
            for(let y = 0; y < scene.rows; y++){
        
                let ypos = y * scene.scl;
                scene.grid[ypos] = [];
    
                for(let x = 0; x < scene.cols; x++){
    
                    let xpos = x * scene.scl;
                    scene.grid[ypos][xpos] = {};
                }
    
            }
    
            let xoff = 0;
            let yoff = 0;
            scene.zoff = 0;
    
            for(let y in scene.grid){
    
                for(let x in scene.grid){
    
                    let xori = parseFloat(x);
                    let yori = parseFloat(y);
                    let angle = scene.noise.simplex3(xoff, yoff, scene.zoff);
    
                    let xdest = 10 * Math.cos(angle);
                    let ydest = 10 * Math.sin(angle);

                    let force = new Vector(xori + xdest, yori + ydest);
                    force.sub({x: xori, y: yori});
    
                    scene.grid[y][x] = {
    
                        xori: xori,
                        yori: yori,
                        xoff: xoff,
                        yoff: yoff,
                        force: force,
                        line: new Line(scene, xori, yori, xori + xdest, yori + ydest)
                    };
                    
                    
                    xoff += 0.1;
                }
    
                yoff += 0.1;
            }
        },

        simpleNoise3dUpdate: () => {
       
            for(let y in scene.grid){

                for(let x in scene.grid){
    
    
                    let angle = scene.noise.simplex3(scene.grid[y][x].xoff, scene.grid[y][x].yoff, scene.zoff);
    
                    let xdest = 10 * Math.cos(angle);
                    let ydest = 10 * Math.sin(angle);

                    scene.grid[y][x].line.line.setTo(scene.grid[y][x].xori, scene.grid[y][x].yori, scene.grid[y][x].xori + xdest, scene.grid[y][x].yori + ydest);
    
                    scene.graph.strokeLineShape(scene.grid[y][x].line.line)
    
                }
            }
    
            scene.zoff += 0.01;
        }
    };
};

export default Controller;