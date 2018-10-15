const inspectObj = (obj) => {

    console.log(`%c${obj.constructor.name}`, 'color: #00FFFF');
    for(let m in obj)
        if(typeof obj[m] === 'function')
            console.log(`%c${m}`, 'color: #FF0000');
    
    for(let m in obj)
        if(typeof obj[m] !== 'function'){
            let type = typeof obj[m];
            console.log(`${type}: ${m}`);
        }
    
}

const random = (max, min) => {
    
    return Math.floor(Math.random()*(max-(min)+1)+(min));
}

const randomArrayEle = (arr) => {
    
    return arr[Math.floor(Math.random() * arr.length)];
}

export {

    inspectObj,
    random,
    randomArrayEle
};