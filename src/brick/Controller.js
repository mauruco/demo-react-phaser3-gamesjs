const Controller = (scene) => {

    // init
    setTimeout(() => {

        let canvas = document.getElementsByTagName('canvas')[0];
        canvas.className = 'canvas-border';
    });

    return {

        makeGrid: (worldWH, cell) => {

            let grid = [];
            let max = Math.floor(worldWH / cell);

            for(let y = 1; y <= max; y++){
                grid[(cell*y)-(cell/2)] = [];
                for(let x = 1; x <= max; x++)
                    grid[(cell*y)-(cell/2)][(cell*x)-(cell/2)] = scene.add.sprite((cell*x)-(cell/2), (cell*y)-(cell/2), 'grid');

            }

            return grid;
        },

        addBricks: (worldWH, initY, brickSize, rows) => {

            let max = worldWH / brickSize[0];
            let psy = initY;
            let bricks = scene.physics.add.group();
            
            for(let i = 0; i < rows; i++){
                
                let psx = brickSize[0]/2;
                for(let y = 0 ; y < max; y++){
                    
                    let brick = scene.physics.add.image(psx, psy, 'brick');
                    bricks.add(brick);
                    psx += brickSize[0];

                }

                psy += brickSize[1];
            }

            return bricks;
        },

        addBall: (x, y, vx, vy) => {

            let ball = scene.physics.add.image(x, y, 'ball');
            ball.setVelocity(vx, vy);
            ball.setBounce(1, 1);
            ball.setCollideWorldBounds(true);
            return ball
        },
    };
};

export default Controller;