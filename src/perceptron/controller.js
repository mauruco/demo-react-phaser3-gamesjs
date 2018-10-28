import Phaser from '../Phaser';

const controller = (scene, width, height, graph) => {

    return {

        makeFrontier: () => {

            let line = new Phaser.Geom.Line(0,0, width, height);
            graph.lineStyle(1, 0x666666);
            graph.strokeLineShape(line); 
        },

        makePoints: (amount) => {

            let points = [];
            
            for(let i = 0; i < amount; i++){

                let x = (Math.random() * width * 2) >> 1;
                let y = (Math.random() * height * 2) >> 1;
                let correctAnswer = x > y ? 1 : -1;
                points.push({x,y, correctAnswer});

                // scene.add.text(x, y, 'point: ' + i, { fontSize: '12px', color: '#000000', backgroundColor: '#FFFFFF' });
            }

            return points;
        },

        drawPoint: (point, output) => {
            
            let color = output > 0 ? 0x00FF00 : 0xFF0000;
            graph.fillStyle(color);
            graph.fillPointShape({x: point[0], y:point[1]}, 3);
        }
    };
};

export default controller;