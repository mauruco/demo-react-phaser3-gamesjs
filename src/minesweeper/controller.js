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

        // makeGrid: (posY, posX) => {
        makeGrid: () => {

            let grid = [];
            for(let y = 0; y < scene.height / scene.scl; y++){

                grid[y] = [];
                for(let x = 0; x < scene.width / scene.scl; x++){

                    grid[y][x] = scene.add.image(x * scene.scl + (scene.scl>>1), y * scene.scl + (scene.scl>>1), 'slice', 'button.png');
                    grid[y][x].setScale(scene.imgScl);
                    grid[y][x].options = {
                        arrY: y,
                        arrX: x,
                        bombs: 0,
                        isBomb: false
                    };

                    grid[y][x].setInteractive();
                }
            }

            return grid;
        },

        loopThrough: (grid, apply) => {

            for(let y = 0; y < scene.height / scene.scl; y++)
                for(let x = 0; x < scene.width / scene.scl; x++)
                    grid[y][x] = apply(grid[y][x]);

            return grid;
        },

        placeBombs: (grid, totalBoombs) => {

            while(true) {

                let y = Math.floor(Math.random() * (scene.height / scene.scl));
                let x = Math.floor(Math.random() * (scene.width / scene.scl));

                if(grid[y][x].options.isBomb)
                    continue;

                grid[y][x].options.isBomb = true;

                totalBoombs--;
                if(totalBoombs === 0)
                    break;
            }

            return grid;
        },

        countBombs: (grid) => {

            scene.ctrl.loopThrough(grid, (obj) => {

                if(!obj.options.isBomb)
                    return obj;

                // acima direita
                if(grid[obj.options.arrY-1] && grid[obj.options.arrY-1][obj.options.arrX-1])
                    grid[obj.options.arrY-1][obj.options.arrX-1].options.bombs++;
                // acima
                if(grid[obj.options.arrY-1] && grid[obj.options.arrY-1][obj.options.arrX])
                    grid[obj.options.arrY-1][obj.options.arrX].options.bombs++;
                // acima esquerda
                if(grid[obj.options.arrY-1] && grid[obj.options.arrY-1][obj.options.arrX+1])
                    grid[obj.options.arrY-1][obj.options.arrX+1].options.bombs++;
                // esquerda
                if(grid[obj.options.arrY] && grid[obj.options.arrY][obj.options.arrX-1])
                    grid[obj.options.arrY][obj.options.arrX-1].options.bombs++;
                // direita
                if(grid[obj.options.arrY] && grid[obj.options.arrY][obj.options.arrX+1])
                    grid[obj.options.arrY][obj.options.arrX+1].options.bombs++;
                // abaixo direita
                if(grid[obj.options.arrY+1] && grid[obj.options.arrY+1][obj.options.arrX-1])
                    grid[obj.options.arrY+1][obj.options.arrX-1].options.bombs++;
                // abaixo
                if(grid[obj.options.arrY+1]&& grid[obj.options.arrY+1][obj.options.arrX])
                    grid[obj.options.arrY+1][obj.options.arrX].options.bombs++;
                // abaixo esquerda
                if(grid[obj.options.arrY+1] && grid[obj.options.arrY+1][obj.options.arrX+1])
                    grid[obj.options.arrY+1][obj.options.arrX+1].options.bombs++;

                return obj;
            });

            return grid;
        },

        addEmpty(x, y, options) {

            let empty = scene.add.image(x, y, 'slice', 'empty.png');
            empty.setScale(scene.imgScl);
        },

        addNumber(x, y, number) {

            let color = [];
            color[0] = '#000000';
            color[1] = '#0000FF';
            color[2] = '#007B00';
            color[3] = '#FF0000';
            color[4] = '#00007B';
            color[5] = '#7B0000';
            color[6] = '#7B007B';
            color[7] = '#7B7B00';
            color[8] = '#7B7B7B';

            let style = {
                fontFamily: 'Arial Black,Arial Bold,Gadget,sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: color[number],
                stroke: color[number],
                strokeThickness: 1,
                align: 'center'
            };

            scene.add.text(x-7, y-13, number, style);
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
        
            scene.ctrl.loopThrough(grid, (obj) => {

                let x = obj.x;
                let y = obj.y;
                let options = obj.options;
                obj.disableInteractive();

                if(!options.isBomb && options.bombs)
                    scene.ctrl.addNumber(x, y, options.bombs);

                if(options.isBomb){

                    let bomb = scene.add.image(x, y, 'slice', 'bomb.png');
                    bomb.setScale(scene.imgScl);
                }

                return obj;
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
    
        gameOver: (x, y, grid) => {
    
            scene.ctrl.clearAll(grid);

            let bomb = scene.add.image(x, y, 'slice', 'bombactive.png');
            bomb.setScale(scene.imgScl);

            let sprite = scene.add.sprite(scene.width>>1, scene.height>>1, 'gameover').setInteractive({ useHandCursor: true });
            sprite.setInteractive({ useHandCursor: true });
            sprite.on('pointerover', () => sprite.alpha = 0.9);
            sprite.on('pointerout', () => sprite.alpha = 1);
            sprite.on('pointerdown', () => {

                window.location.reload();
            });
        }
    };
};

export default controller;