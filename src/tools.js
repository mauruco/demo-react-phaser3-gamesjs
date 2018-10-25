const pixel = (graph, x, y, r, g, b, a = 1) =>{

    r = parseInt(r);
    g = parseInt(g);
    b = parseInt(b);
    r = ('0'+r.toString(16)).slice(-2);
    g = ('0'+g.toString(16)).slice(-2);
    b = ('0'+b.toString(16)).slice(-2);
    let pixel = {height: 1, width: 1, x: x, y: y};
    graph.fillStyle(`0x${r}${g}${b}`, a);
    graph.fillRectShape(pixel);
}

export {
    pixel
};