import { randomArrayEle } from '../helpers';

const controller = (scene) => {

    return {

        controllers: () => {

            let opt = document.createElement('div');
            opt.id = 'opt';
            opt.innerHTML = '<input type="text" disabled="disabled" value="000"/><a href="'+process.env.REACT_APP_APP_URL+'/?hard#minesweeper"></a><div></div><a href="#">Need help?</a><button></button><input type="text" disabled="disabled" value="000"/>';
            let a = opt.getElementsByTagName('a')[0];
            scene.help = opt.getElementsByTagName('a')[1];
            let canvas = document.getElementsByTagName('canvas')[0];
            let body = document.getElementsByTagName('body')[0];
            body.id = 'minesweeper';
            body.insertBefore(opt, canvas);
            body.style.backgroundImage = 'none';

            let dificulty = window.location.search;

            scene.timeCtrl = opt.getElementsByTagName('input')[0];
            scene.boombsCalc = opt.getElementsByTagName('input')[1];
            scene.smily = opt.getElementsByTagName('div')[0];
            scene.marker = opt.getElementsByTagName('button')[0];
            scene.boombsCalc.value = ('00'+scene.bombsNumber).slice(-3);


            a.innerHTML = 'To easy?'
            a.href = process.env.REACT_APP_APP_URL + '/' + '?hard#minesweeper';
            
            if(dificulty === '?hard'){
                
                opt.style.width = '1350px';
                opt.style.marginLeft = '-675px';
                a.innerHTML = 'To hard?'
                a.href = process.env.REACT_APP_APP_URL + '/' + '#minesweeper';
                canvas.style.marginLeft = '-675px';
            }
        },

        makeGrid: () => {

            let grid = [];
            for(let y = 0; y < scene.height / scene.scl; y++){
                grid[y] = [];
                for(let x = 0; x < scene.width / scene.scl; x++){
                    
                    scene.totalPlaces++;
                    let posX = x * scene.scl + (scene.scl>>1);
                    let posY = y * scene.scl + (scene.scl>>1);
                    grid[y][x] = scene.add.image(posX, posY, 'slice', 'button.png');
                    grid[y][x].setScale(scene.imgScl);
                    grid[y][x].options = {
                        posX,
                        posY,
                        arrY: y,
                        arrX: x,
                        bombs: 0,
                        propability: 0,
                        isBomb: false,
                        isClear: false,
                        marker: null
                    };

                    grid[y][x].setInteractive();
                }
            }

            return grid;
        },

        getFreePlace: (grid, freePlace) => {

            while(true) {

                let gridY = randomArrayEle(grid);
                let obj = randomArrayEle(gridY);

                
                if(obj.options.bombs > 0 || obj.options.isBomb)
                    continue;

                let style = {
                    fontFamily: 'Arial Black,Arial Bold,Gadget,sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#00FF00',
                    stroke: '#000000',
                    strokeThickness: 3,
                    align: 'center'
                }
        
                freePlace = scene.add.text(obj.options.posX-7, obj.options.posY-14, obj.options.bombs, style);
                return freePlace;
            }
        },

        time: () => {
            
            scene.timeInterval = setInterval(() => {
                
                if(scene.timeCtrl.value === '999') {

                    clearInterval(scene.timeInterval);
                    return;
                }

                scene.timeCtrl.value = ('00' + (parseInt(scene.timeCtrl.value) + 1)).slice(-3);
            }, 1000);
        },

        loopThroughGrid: (grid, apply) => {

            for(let y = 0; y < scene.height / scene.scl; y++)
                for(let x = 0; x < scene.width / scene.scl; x++)
                    grid[y][x] = apply(grid[y][x]);

            return grid;
        },

        loopThroughParents: (obj, grid, apply) => {

            let parents = [];
            let x = obj.options.arrX;
            let y = obj.options.arrY;
            if(grid[y-1] && grid[y-1][x-1])     // acima esquerda
                parents.push(grid[y-1][x-1]);
            if(grid[y-1] && grid[y-1][x])       // acima
                parents.push(grid[y-1][x]);
            if(grid[y-1] && grid[y-1][x+1])     // acima direita
                parents.push(grid[y-1][x+1]);
            if(grid[y] && grid[y][x-1])         // esquerda
                parents.push(grid[y][x-1]);
            if(grid[y] && grid[y][x+1])         // direita
                parents.push(grid[y][x+1]);
            if(grid[y+1] && grid[y+1][x-1])     // abaixo esquerda
                parents.push(grid[y+1][x-1]);
            if(grid[y+1] && grid[y+1][x])       // abaixo
                parents.push(grid[y+1][x]);
            if(grid[y+1] && grid[y+1][x+1])     // abaixo direita
                parents.push(grid[y+1][x+1]);

            for(let i = 0; i < parents.length; i++)
                parents[i] = apply(parents[i]);
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

            scene.ctrl.loopThroughGrid(grid, (obj) => {

                if(!obj.options.isBomb)
                    return obj;

                scene.ctrl.loopThroughParents(obj, grid, (parent) => {

                    if(parent){

                        parent.options.bombs++;
                        return parent;
                    }
                    return parent;
                });

                return obj;
            });

            return grid;
        },

        clearParentsAllroundMe: (obj, grid) => {
            
            scene.ctrl.loopThroughParents(obj, grid, (parent) => {
                
                if(parent.options.isClear || parent.options.isBomb)
                    return parent;
                
                scene.ctrl.clearSpot(parent, grid);
                return parent;
            });
        },

        clearBombs: (grid, callBack) => {

            scene.ctrl.loopThroughGrid(grid, (obj) => {

            });
            callBack();
        },

        clearAll: (grid, callBack) => {
        
            scene.ctrl.loopThroughGrid(grid, (obj) => {

                if(obj.options.isClear)
                    return;

                obj.options.isClear = true;
                obj.disableInteractive();
                scene.ctrl.clearSpot(obj, grid, true)
            });

            callBack();
        },

        clearSpot: (obj, grid, gameover = false) => {

            if(!obj)
                return;

                
            if(scene.markerActive && !gameover) {
                
                let bombs = parseInt(scene.boombsCalc.value);
                
                if(obj.options.marker) {
                    
                    bombs++;
                    scene.boombsCalc.value = ('00'+bombs).slice(-3);
                    obj.options.marker.destroy();
                    obj.options.marker = null;
                    return;
                }
                
                
                bombs--;
                scene.boombsCalc.value = ('00'+bombs).slice(-3);
                scene.ctrl.addMarker(obj);
                return;
            }
                
            if(obj.options.marker)
                return;
            
            if(!gameover)
                scene.totalPlaces--;

            obj.disableInteractive();
            obj.options.isClear = true;

            if(!obj.options.isBomb)
                scene.ctrl.addEmpty(obj);
                
            if(!obj.options.isBomb && obj.options.bombs)
                scene.ctrl.addNumber(obj);

            if(!obj.options.isBomb && !obj.options.bombs)
                scene.ctrl.clearParentsAllroundMe(obj, grid);
                
            if(obj.options.isBomb && gameover)
                scene.ctrl.addBomb(obj);

            if(obj.options.isBomb && !gameover){

                scene.ctrl.addBombActive(obj);
                scene.ctrl.gameOver(grid);
            }

            if(scene.totalPlaces  === 0 && !gameover)
                scene.ctrl.success(grid);
        },
    
        getClearedPlaces: (grid) => {

            let cleared = [];
            let gridClone = grid.slice();

            scene.ctrl.loopThroughGrid(gridClone, (obj) => {

                if(!obj.options.isClear || obj.options.bombs === 0)
                    return obj;

                let parents = [];

                scene.ctrl.loopThroughParents(obj, grid, (parent) => {

                    if(parent.options.isClear)
                        return parent;

                    parent.options.propability = 0;
                    parents.push(parent);
                    return parent;
                });

                obj.options.parents = parents;

                cleared.push(obj);
                return obj;
            });

            return cleared;
        },

        clearPropabilitys: (drawedPropabilitys) => {

            if(!drawedPropabilitys)
                return [];

            for(let key in drawedPropabilitys){

                drawedPropabilitys[key].destroy();
                delete(drawedPropabilitys[key]);
            }

            return [];
        },

        getPropabilitys: (cleareds) => {

            let propabilitys = [];

            for(let i = 0; i < cleareds.length; i++){

                let obj = cleareds[i];
                let parents = cleareds[i].options.parents;

                let propability = Math.round((obj.options.bombs * 100) / parents.length);

                for(let y = 0; y < parents.length; y++){

                    if(parents[y].options.propability >= propability)
                        continue;

                    parents[y].options.propability = propability;
                    propabilitys[(parents[y].options.posX + parents[y].options.posY * scene.width) * 4] = { marker: parents[y].options.marker ? true : false, x: parents[y].options.posX, y: parents[y].options.posY, number: ('  '+propability).slice(-3)};
                }
            }

            let reOrdered = [];
            for(let key in propabilitys)
                reOrdered.push(propabilitys[key]);

            propabilitys = [];
            return reOrdered;
        },

        addMarker: (obj) => {

            obj.options.marker = scene.add.image(obj.x, obj.y, 'slice', 'buttonmarked.png');
            obj.options.marker.setScale(scene.imgScl);
        },

        addBomb: (obj) => {

            let bomb = scene.add.image(obj.x, obj.y, 'slice', 'bomb.png');
            bomb.setScale(scene.imgScl);
        },

        addBombActive: (obj) => {

            let bomb = scene.add.image(obj.x, obj.y, 'slice', 'bombactive.png');
            bomb.setScale(scene.imgScl);
        },

        addEmpty: (obj) => {

            let empty = scene.add.image(obj.x, obj.y, 'slice', 'empty.png');
            empty.setScale(scene.imgScl);
        },

        addNumber: (obj) => {

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
                color: color[obj.options.bombs],
                stroke: color[obj.options.bombs],
                strokeThickness: 1,
                align: 'center'
            };

            scene.add.text(obj.x-7, obj.y-13, obj.options.bombs, style);
        },

        success: (grid) => {

            scene.smily.className = 'success';
            clearInterval(scene.timeInterval);
    
            setTimeout(() => {

                scene.ctrl.clearBombs(grid, () => {

                    let sprite = scene.add.sprite(scene.width>>1, scene.height>>1, 'success');
                    sprite.setInteractive({ useHandCursor: true });
                    sprite.on('pointerover', () => sprite.alpha = 0.9);
                    sprite.on('pointerout', () => sprite.alpha = 1);
                    sprite.on('pointerdown', () => window.location.reload());
                });
            });
        },
    
        gameOver: (grid) => {

            scene.smily.className = 'gameover';
            clearInterval(scene.timeInterval);

            setTimeout( () => {
            
                scene.ctrl.clearAll(grid, () => {

                    let sprite = scene.add.sprite(scene.width>>1, scene.height>>1, 'gameover');
                    sprite.setInteractive({ useHandCursor: true });
                    sprite.on('pointerover', () => sprite.alpha = 0.9);
                    sprite.on('pointerout', () => sprite.alpha = 1);
                    sprite.on('pointerdown', () => window.location.reload());
                });
            });
        }
    };
};

export default controller;