const Controller = (scene, Phaser) => {

    return {

        randomArrayEle: (arr) => {
    
            return arr[Math.floor(Math.random() * arr.length)];
        },

        controllers: (totalBoombs) => {

            if(document.getElementById('boombvalue'))
                return;

            let inline = document.createElement('span');
            inline.innerHTML = 'Total Bombs (max 99):';
            let inp = document.createElement('input');
            inp.type = 'number';
            inp.value = totalBoombs;
            inp.id = 'boombvalue';
            inp.max = '99';
            let button = document.createElement('button');
            button.innerHTML = 'APPLY';
            button.className = 'dark';
            button.onclick = () => {

                if(inp.value > 99)
                    inp.value = 99;

                scene.events.emit('boombsnumberchange', inp.value);
            };

            let opt = document.getElementById('opt');
            opt.appendChild(inline);
            opt.appendChild(inp);
            opt.appendChild(button);
        },

        makePosX: (boomWidth, worldWidth) => {

            let posX = [];
            let x = boomWidth / 2;
            for(let i = 0; i < worldWidth / boomWidth; i++){
    
                posX.push(x);
                x += boomWidth;
            }

            return posX;
        },

        makePosY: (boomHeight, worldHeight) => {

            let posY = [];
            let y = boomHeight / 2;
            for(let i = 0; i < worldHeight / boomHeight; i++){
    
                posY.push(y);
                y += boomHeight;
            }

            return posY;
        },

        makeGrid: (posY, posX) => {

            let grid = []; 
            for(let y in posY) {

                grid[posY[y]] = [];
                for(let x in posX)
                    grid[posY[y]][posX[x]] = true;
            }

            return grid;
        },

        walkGrid: (grid, callBack) => {

            for(let posY in grid)
                for(let posX in grid[posY])
                    callBack(posY, posX);
        },

        placeSprites: (grid, state) => {

            scene.Ctrl.walkGrid(grid, (posY, posX) => {

                let sprite = scene.add.sprite(posX, posY, 'ready');
                sprite.state = {
    
                    ...state,
                    x: posX,
                    y: posY
                };
                
                grid[posY][posX] = sprite;
            });

            return grid;
        },

        countPositions: (grid) => {

            let totalPostions = 0;
            scene.Ctrl.walkGrid(grid, () => {
                
                totalPostions++;
            });

            return totalPostions;
        },

        placeBoombs: (grid, posY, posX, totalBoombs) => {

            while(true) {

                let x = scene.Ctrl.randomArrayEle(posX);
                let y = scene.Ctrl.randomArrayEle(posY);

                if(grid[y][x].state.type === 'boomb')
                continue;
                
                grid[y][x].state.type = 'boomb';

                totalBoombs--;
                if(totalBoombs === 0)
                    break;
            }

            return grid;
        },

        attachEvent: (grid, onCklickHandler) => {

            scene.Ctrl.walkGrid(grid, (posY, posX) => {

                grid[posY][posX].setInteractive({ useHandCursor: true });
                grid[posY][posX].on('pointerup', () => onCklickHandler(grid[posY][posX]));
            });

            return grid;
        },

        countBoombsAllround: (grid, boomWidth, boomHeight) => {

            scene.Ctrl.walkGrid(grid, (posY, posX) => {

                if(grid[posY][posX].state.type === 'boomb'){

                    // topLeft
                    if(grid[parseInt(posY)-boomHeight] && grid[parseInt(posY)-boomHeight][parseInt(posX)-boomWidth])
                        grid[parseInt(posY)-boomHeight][parseInt(posX)-boomWidth].state.boombsAllround++;
                    // topRight
                    if(grid[parseInt(posY)-boomHeight] && grid[parseInt(posY)-boomHeight][parseInt(posX)+boomWidth])
                        grid[parseInt(posY)-boomHeight][parseInt(posX)+boomWidth].state.boombsAllround++;
                    // topCenter
                    if(grid[parseInt(posY)-boomHeight] && grid[parseInt(posY)-boomHeight][parseInt(posX)])
                        grid[parseInt(posY)-boomHeight][parseInt(posX)].state.boombsAllround++;
    
                    // bottomLeft
                    if(grid[parseInt(posY)+boomHeight] && grid[parseInt(posY)+boomHeight][parseInt(posX)-boomWidth])
                        grid[parseInt(posY)+boomHeight][parseInt(posX)-boomWidth].state.boombsAllround++;
                    // bottomRight
                    if(grid[parseInt(posY)+boomHeight] && grid[parseInt(posY)+boomHeight][parseInt(posX)+boomWidth])
                        grid[parseInt(posY)+boomHeight][parseInt(posX)+boomWidth].state.boombsAllround++;
                    // bottomCenter
                    if(grid[parseInt(posY)+boomHeight] && grid[parseInt(posY)+boomHeight][parseInt(posX)])
                        grid[parseInt(posY)+boomHeight][parseInt(posX)].state.boombsAllround++;
    
                    // left
                    if(grid[parseInt(posY)] && grid[parseInt(posY)][parseInt(posX)-boomWidth])
                        grid[parseInt(posY)][parseInt(posX)-boomWidth].state.boombsAllround++;
                    // right
                    if(grid[parseInt(posY)] && grid[parseInt(posY)][parseInt(posX)+boomWidth])
                        grid[parseInt(posY)][parseInt(posX)+boomWidth].state.boombsAllround++;
                }
            });

            return grid;
        },

        clearSpace: (y, x, grid, totalPositions, boomHeight, boomWidth) => {

            if(grid[y] && grid[y][x] && grid[y][x].state.type !== 'boomb' && !grid[y][x].state.clear) {

                scene.totalPositions--;

                let state = {
                    ...grid[y][x].state,
                    clear: true
                }

                grid[y][x].destroy();
                grid[y][x] = scene.add.sprite(x, y, 'empty');
                grid[y][x].state = {...state};

                if(state.boombsAllround)
                    return scene.add.text(x -7, y-12, state.boombsAllround, { fontSize: '24px', fill: '#000' });

    
                // topLeft
                scene.Ctrl.clearSpace(parseInt(y)-boomHeight, parseInt(x)-boomWidth, grid, totalPositions, boomHeight, boomWidth);
                // topRigh
                scene.Ctrl.clearSpace(parseInt(y)-boomHeight, parseInt(x)+boomWidth, grid, totalPositions, boomHeight, boomWidth);
                // topCenter
                scene.Ctrl.clearSpace(parseInt(y)-boomHeight, x, grid, totalPositions, boomHeight, boomWidth);
                // bottomLeft
                scene.Ctrl.clearSpace(parseInt(y)+boomHeight, parseInt(x)-boomWidth, grid, totalPositions, boomHeight, boomWidth);
                // bottomRight
                scene.Ctrl.clearSpace(parseInt(y)+boomHeight, parseInt(x)+boomWidth, grid, totalPositions, boomHeight, boomWidth);
                // bottomCenter
                scene.Ctrl.clearSpace(parseInt(y)+boomHeight, x, grid, totalPositions, boomHeight, boomWidth);
                // left
                scene.Ctrl.clearSpace(y, parseInt(x)-boomWidth, grid, totalPositions, boomHeight, boomWidth);
                // right
                scene.Ctrl.clearSpace(y, parseInt(x)+boomWidth, grid, totalPositions, boomHeight, boomWidth);
            }
        },

        clearAll: (grid) => {
        
            scene.Ctrl.walkGrid(grid, (posY, posX) => {

                grid[posY][posX].disableInteractive();

                if(grid[posY][posX].state.type === 'boomb'){

                    grid[posY][posX].destroy();
                    scene.add.sprite(posX, posY, 'boomb');
                }
            });
        },

        success: (grid, worldHeight, worldWidth) => {

            scene.Ctrl.clearAll(grid);
            setTimeout(()=>{
    
                let sprite = scene.add.sprite(worldWidth / 2, worldHeight / 2, 'success').setInteractive({ useHandCursor: true });
                sprite.on('pointerover', () => sprite.alpha = 0.9);
                sprite.on('pointerout', () => sprite.alpha = 1);
                sprite.on('pointerup', () => window.location.reload());
                sprite.on('pointerup', () => window.location.reload());
            });
        },
    
        gameOver: (grid, worldHeight, worldWidth) => {
    
            scene.Ctrl.clearAll(grid);
            setTimeout(()=>{
    
                let sprite = scene.add.sprite(worldWidth / 2, worldHeight / 2, 'gameover').setInteractive({ useHandCursor: true });
                sprite.on('pointerover', () => sprite.alpha = 0.9);
                sprite.on('pointerout', () => sprite.alpha = 1);
                sprite.on('pointerup', () => window.location.reload());
                sprite.on('pointerup', () => window.location.reload());
            });
        }
    };
};

export default Controller;