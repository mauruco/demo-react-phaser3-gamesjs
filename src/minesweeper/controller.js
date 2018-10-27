const controller = (scene) => {

    return {

        randomArrayEle: (arr) => {
    
            return arr[Math.floor(Math.random() * arr.length)];
        },

        controllers: (totalBoombs) => {

            window.sceneemit = (e) => {

                e.preventDefault();
                scene.events.emit('boombsnumberchange')
            };
            let opt = document.getElementById('opt');
            opt.innerHTML = '<span class="inline">Total Bombs (max 99): </span><input type="number" value="'+totalBoombs+'" /><button class="dark" onclick="window.sceneemit(event)">APPLY</button>';

            scene.events.removeAllListeners(['boombsnumberchange']);
            scene.events.addListener('boombsnumberchange', () => {
    
                let inp = document.querySelector('#opt input');
                if(inp.value > 99)
                    inp.value = 99;
                scene.scene.restart({totalBoombs: inp.value});
            });
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

            scene.ctrl.walkGrid(grid, (posY, posX) => {

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
            scene.ctrl.walkGrid(grid, () => {
                
                totalPostions++;
            });

            return totalPostions;
        },

        placeBoombs: (grid, posY, posX, totalBoombs) => {

            while(true) {

                let x = scene.ctrl.randomArrayEle(posX);
                let y = scene.ctrl.randomArrayEle(posY);

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

            scene.ctrl.walkGrid(grid, (posY, posX) => {

                grid[posY][posX].setInteractive({ useHandCursor: true });
                grid[posY][posX].on('pointerup', () => onCklickHandler(grid[posY][posX]));
            });

            return grid;
        },

        countBoombsAllround: (grid, boomWidth, boomHeight) => {

            scene.ctrl.walkGrid(grid, (posY, posX) => {

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
                scene.ctrl.clearSpace(parseInt(y)-boomHeight, parseInt(x)-boomWidth, grid, totalPositions, boomHeight, boomWidth);
                // topRigh
                scene.ctrl.clearSpace(parseInt(y)-boomHeight, parseInt(x)+boomWidth, grid, totalPositions, boomHeight, boomWidth);
                // topCenter
                scene.ctrl.clearSpace(parseInt(y)-boomHeight, x, grid, totalPositions, boomHeight, boomWidth);
                // bottomLeft
                scene.ctrl.clearSpace(parseInt(y)+boomHeight, parseInt(x)-boomWidth, grid, totalPositions, boomHeight, boomWidth);
                // bottomRight
                scene.ctrl.clearSpace(parseInt(y)+boomHeight, parseInt(x)+boomWidth, grid, totalPositions, boomHeight, boomWidth);
                // bottomCenter
                scene.ctrl.clearSpace(parseInt(y)+boomHeight, x, grid, totalPositions, boomHeight, boomWidth);
                // left
                scene.ctrl.clearSpace(y, parseInt(x)-boomWidth, grid, totalPositions, boomHeight, boomWidth);
                // right
                scene.ctrl.clearSpace(y, parseInt(x)+boomWidth, grid, totalPositions, boomHeight, boomWidth);
            }
        },

        clearAll: (grid) => {
        
            scene.ctrl.walkGrid(grid, (posY, posX) => {

                grid[posY][posX].disableInteractive();

                if(grid[posY][posX].state.type === 'boomb'){

                    grid[posY][posX].destroy();
                    scene.add.sprite(posX, posY, 'boomb');
                }
            });
        },

        success: (grid, worldHeight, worldWidth) => {

            scene.ctrl.clearAll(grid);
            setTimeout(()=>{
    
                let sprite = scene.add.sprite(worldWidth / 2, worldHeight / 2, 'success').setInteractive({ useHandCursor: true });
                sprite.on('pointerover', () => sprite.alpha = 0.9);
                sprite.on('pointerout', () => sprite.alpha = 1);
                sprite.on('pointerup', () => window.location.reload());
                sprite.on('pointerup', () => window.location.reload());
            });
        },
    
        gameOver: (grid, worldHeight, worldWidth) => {
    
            scene.ctrl.clearAll(grid);
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

export default controller;