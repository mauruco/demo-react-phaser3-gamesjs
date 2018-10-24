const Controller = (scene) => {

    // init
    setTimeout(() => {

        let canvas = document.getElementsByTagName('canvas')[0];
        canvas.className = 'canvas-border';
    });

    return {

        createPoints: () => {

            let opt = document.createElement('div');
            opt.className = 'opt';
            let body = document.getElementsByTagName('body')[0];
            let span = document.createElement('span');
            span.innerHTML = 'POINTS: '
            let points = document.createElement('input');
            points.type = 'number';
            points.disabled = true;
            points.className = 'points';
            points.value = 0;
            opt.appendChild(span);
            opt.appendChild(points);
            body.appendChild(opt);
            
            let canvas = document.getElementsByTagName('canvas')[0];
            canvas = canvas.getBoundingClientRect();
            opt.style.top = (canvas.y - 35)+'px';
            opt.style.left = canvas.x+'px';
            opt.style.right = 'auto';
            return points;
        },

        randomArrayEle: (arr) => {
    
            return arr[Math.floor(Math.random() * arr.length)];
        },

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

        walkGrid: (grid, callBack) => {

            for(let psy in grid)
                for(let psx in grid[psy])
                    callBack(psy, psx);
        },

        countGrid: (grid) => {

            let count = 0;
            for(let y in grid)
                for(let x in grid[y]){

                    count++;
                    scene.abc = x; // somento pra tirar warning no console :/
                }

            return count;
        },

        directionHandler: (e, snake) => {

            if(e.key === 'ArrowLeft' && snake.direction !== 'left' && snake.direction !== 'right' && !snake.nextDirection)
                snake.nextDirection = 'left';

            if(e.key === 'ArrowRight' && snake.direction !== 'right' && snake.direction !== 'left' && !snake.nextDirection)
                snake.nextDirection = 'right';

            if(e.key === 'ArrowUp' && snake.direction !== 'up' && snake.direction !== 'down' && !snake.nextDirection)
                snake.nextDirection = 'up';

            if(e.key === 'ArrowDown' && snake.direction !== 'down' && snake.direction !== 'up' && !snake.nextDirection)
                snake.nextDirection = 'down';

            return snake;
        },

        getNexPosition: (snake, cell) => {

            let snakeHead = snake.body[0];
            let y = snakeHead.y;
            let x = snakeHead.x;

            if(snake.direction === 'left')
                x = parseInt(snakeHead.x) - cell;
            
            if(snake.direction === 'right')
                x = parseInt(snakeHead.x) + cell;
        
            if(snake.direction === 'up')
                y = parseInt(snakeHead.y) - cell;
            
            if(snake.direction === 'down')
                y = parseInt(snakeHead.y) + cell;

            return {x: x, y: y};
        },

        getTailPosition: (snake) => {

            return {x: snake.body[snake.body.length-1].x, y: snake.body[snake.body.length-1].y};
        },

        moveSnake: (snake, nextPosition) => {

            let sprite = snake.body.pop();
            sprite.y = nextPosition.y;
            sprite.x = nextPosition.x;
            snake.body.unshift(sprite);

            return snake;
        },

        checkCollisionWithSnakeBody: (snake, nextPosition) => {

            for(let i = 3; i < snake.body.length; i++)
                if(snake.body[i].x === nextPosition.x && snake.body[i].y === nextPosition.y)
                    return true;

            return false;
        },

        checkCollisionWorld: (nextPosition, worldWH) => {

            if(nextPosition.x <= 0 || nextPosition.x >= worldWH || nextPosition.y <= 0 || nextPosition.y >= worldWH)
                return true;

            return false;
        },

        checkCollisionWithFruit: (nextPosition, fruit) => {

            if(nextPosition.x === parseInt(fruit.x) && nextPosition.y === parseInt(fruit.y))
                return true;

            return false;
        },

        randomPositionFruit: (snake, fruit, grid, nextPosition, tailPosition) => {

            let possiblePos = [];
            scene.Ctrl.walkGrid(grid, (psy, psx) => {

                for(let i = 0; i < snake.body.length; i++)
                    if(parseInt(snake.body.x) !== psx && parseInt(snake.body.y) !== psy)
                        if(psy !== nextPosition.y && psx !== nextPosition.x)
                            if(psy !== tailPosition.y && psx !== tailPosition.x)
                                possiblePos.push([psy,psx]);
            });
                    
            let random = scene.Ctrl.randomArrayEle(possiblePos);
            fruit.y = random[0];
            fruit.x = random[1];
            return fruit;
        },
        
        getGrape: (snake, grape, psy, psx) => {

            let randNumber = Math.floor(Math.random() * 99) + 1;

            if(randNumber !== 13)
                return grape;

            return scene.Ctrl.randomPositionFruit(snake, grape, psy, psx);
        },

        changeAlpha: (fruit) => {

            if(fruit.alpha > 0.5)
                fruit.alpha = 0.5;
            else
                fruit.alpha = 1.0;
            return fruit;
        },
        
        getLastbodyPosition: (snake) => {

            return {x: snake.body[snake.body.length-1].x, y: snake.body[snake.body.length-1].y};
        },

        snakeAddBody: (snake, tailPosition) => {

            snake.body.push(scene.add.sprite(tailPosition.x, tailPosition.y, 'body'));
            return snake;
        },

        increaseSpeed: (snake, speeds) => {

            let size = snake.body.length;
            let speed = speeds[4];

            if(size >= 5)
                speed = speeds[5]
            if(size >= 15)
                speed = speeds[6]
            if(size >= 40)
                speed = speeds[7]
            if(size >= 60)
                speed = speeds[8]
            if(size >= 80)
                speed = speeds[9]

            return 60/speed;
        },

        checkSuccess: (snake, gridCount) => {

            if(snake.body.length === (gridCount - 1))
                return true;

            return false;
        },

        getReady: (worldWH, callBack) => {

            let sprite = scene.add.sprite(worldWH / 2, worldWH / 2, 'ready').setInteractive({ useHandCursor: true });
            sprite.on('pointerover', () => sprite.alpha = 0.9);
            sprite.on('pointerout', () => sprite.alpha = 1);
            sprite.on('pointerup', () => {

                sprite.destroy();
                callBack(true);
            });
        },

        success: (worldWH) => {

            setTimeout(()=>{
                
                let sprite = scene.add.sprite(worldWH / 2, worldWH / 2, 'success').setInteractive({ useHandCursor: true });
                sprite.on('pointerover', () => sprite.alpha = 0.9);
                sprite.on('pointerout', () => sprite.alpha = 1);
                sprite.on('pointerup', () => window.location.reload());
            });
        },
        
        gameOver: (worldWH)  => {
            
            setTimeout(()=>{
    
                let sprite = scene.add.sprite(worldWH / 2, worldWH / 2, 'gameover').setInteractive({ useHandCursor: true });
                sprite.on('pointerover', () => sprite.alpha = 0.9);
                sprite.on('pointerout', () => sprite.alpha = 1);
                sprite.on('pointerup', () => window.location.reload());
            });
        }
    }
};

export default Controller;