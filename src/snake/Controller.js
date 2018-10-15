const Controller = (scene) => {

    return {

        randomArrayEle: (arr) => {
    
            return arr[Math.floor(Math.random() * arr.length)];
        },

        makePosX: (gridCellWidth, worldWidth) => {

            let posX = [];
            let x = gridCellWidth / 2;
            for(let i = 0; i < worldWidth / gridCellWidth; i++){
    
                posX.push(x);
                x += gridCellWidth;
            }

            return posX;
        },

        makePosY: (gridCellHeight, worldHeight) => {

            let posY = [];
            let y = gridCellHeight / 2;
            for(let i = 0; i < worldHeight / gridCellHeight; i++){
    
                posY.push(y);
                y += gridCellHeight;
            }

            return posY;
        },

        makeGrid: (posY, posX) => {

            let grid = []; 
            for(let y in posY) {

                grid[posY[y]] = [];
                for(let x in posX)
                    grid[posY[y]][posX[x]] = scene.add.sprite(posX[x], posY[y], 'grid');
            }

            return grid;
        },

        countGrid: (grid) => {

            let count = 0;
            for(let y in grid)
                for(let x in grid[y])
                    count++;

            return count;
        },

        placeSnake: (snake, y, x) => {

            snake.body.push(scene.add.sprite(x, y, 'body'));
            return snake;
        },

        inputHandler: (e, snake) => {

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

        getNexPosition: (snake, gridCellHeight, gridCellWidth) => {

            let y = snake.body[0].y;
            let x = snake.body[0].x;

            if(snake.direction === 'left')
                x = x - gridCellWidth;
            
            if(snake.direction === 'right')
                x = x + gridCellWidth;
            
            if(snake.direction === 'up')
                y = y - gridCellHeight;
            
            if(snake.direction === 'down')
                y = y + gridCellHeight;

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

        checkCollisionWorld: (nextPosition, worldHeight, worldWidth) => {

            if(nextPosition.x <= 0 || nextPosition.x >= worldWidth || nextPosition.y <= 0 || nextPosition.y >= worldHeight)
                return true;

            return false;
        },

        checkCollisionWithCacke: (nextPosition, cacke) => {

            if(nextPosition.x === cacke.x && nextPosition.y === cacke.y)
                return true;

            return false;
        },
        
        placeCacke: (snake, cacke, posY, posX) => {

            let pY = [...posY];
            let pX = [...posX];
            
            let y = scene.Ctrl.randomArrayEle(posY);
            let x = scene.Ctrl.randomArrayEle(posX);

            for(let i = 0; i < snake.body.length; i++){

                if(x === snake.body[i].x && y === snake.body[i].y){

                    delete(pY[y]);
                    delete(pX[x]);
                    
                    return scene.Ctrl.placeCacke(snake, cacke, pY, pX)
                }
            }

            cacke.y = y;
            cacke.x = x;

            return cacke;
        },

        getLastbodyPosition: (snake) => {

            return {x: snake.body[snake.body.length-1].x, y: snake.body[snake.body.length-1].y};
        },

        snakeAddBody: (snake, tailPosition) => {

            snake.body.push(scene.add.sprite(tailPosition.x, tailPosition.y, 'body'));
            return snake;
        },

        increaseSpeed: (snake, speed) => {

            if(snake.body.length > 4)
                speed = 7;

            if(snake.body.length > 9)
                speed = 6;

            if(snake.body.length > 14)
                speed = 5;

            if(snake.body.length > 19)
                speed = 4;

            return speed;
        },

        checkSuccess: (snake, gridCount) => {

            if(snake.body.length === gridCount)
                return true;

            return false;
        },

        success: (worldHeight, worldWidth) => {

            setTimeout(()=>{
                
                let sprite = scene.add.sprite(worldWidth / 2, worldHeight / 2, 'success').setInteractive({ useHandCursor: true });
                sprite.on('pointerover', () => sprite.alpha = 0.9);
                sprite.on('pointerout', () => sprite.alpha = 1);
                sprite.on('pointerup', () => window.location.reload());
                sprite.on('pointerup', () => window.location.reload());
            });
        },
        
        gameOver: (worldHeight, worldWidth)  => {
            
            setTimeout(()=>{
    
                let sprite = scene.add.sprite(worldWidth / 2, worldHeight / 2, 'gameover').setInteractive({ useHandCursor: true });
                sprite.on('pointerover', () => sprite.alpha = 0.9);
                sprite.on('pointerout', () => sprite.alpha = 1);
                sprite.on('pointerup', () => window.location.reload());
                sprite.on('pointerup', () => window.location.reload());
            });
        }
    }
};

export default Controller;