const pixel = (graph, x, y, r = 255, g = 255, b = 255, a = 1) => {

    let pixel = {height: 1, width: 1, x: x, y: y};
    let rgb =  ((r << 16) | (g << 8) | b).toString(16);

    graph.fillStyle(`0x${rgb}`, a);
    graph.fillRectShape(pixel);
}

export {
    pixel
};