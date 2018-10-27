import Phaser from '../Phaser';
import { rgbToHex } from '../helpers'; 

class Colorpicker extends Phaser.Scene {

    static config = () => {

        return {
            type: Phaser.CANVAS,
            width: 600,
            height: 600,
            backgroundColor: 0xFF0000,
            scene: [Colorpicker]
        };
    };

    defaultStyles = {lineStyle: {width: 1, color: 0x000000, alpha: 1}, fillStyle: { color: 0x000000, alpha: 1}};

    constructor() {
        
        super({key: 'Colorpicker'});
    }

    preload() {

        this.load.image('colors', 'assets/colorpicker/colormap.gif');
    }

    text() {

        let opt = document.getElementById('opt');
        opt.innerHTML = '<span class="inline">Color Picker!</span>';
    }

    create() {

        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.mouse = this.input.mousePointer;
        this.graph = this.add.graphics();
        this.graph.setDefaultStyles(this.defaultStyles);
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.text();
        this.i = 0;
        
        this.back = this.add.image(this.width/2, this.height/2, 'colors');
        this.canvasContext = this.canvas.getContext('2d');
        this.webglContext = this.canvas.getContext('webgl');

        this.rect = new Phaser.Geom.Rectangle(10, 10, 100, 100);

        this.rgb = this.add.text(120, 10, 'RGB = 255, 0, 0', { fontSize: '12px', color: '#000000' });
        this.hex = this.add.text(120, 25, 'HEX = FF0000', { fontSize: '12px', color: '#000000' });
    }
    
    color(x, y) {
        
        let pixel = [];
        if(this.canvasContext)
            pixel = this.canvasContext.getImageData(x, y, 1, 1).data;

        if(this.webglContext) {

            // tem que ter utilizado a webgl api pra adiconar um elemento.
            // elementos adiconados coma api de canvas não funcionam
            // não tenho certeza
            // let pixels = new Uint8Array(this.webglContext.drawingBufferWidth * this.webglContext.drawingBufferHeight * 4);
            // this.webglContext.readPixels(x, y, this.webglContext.drawingBufferWidth, this.webglContext.drawingBufferHeight, this.webglContext.RGBA, this.webglContext.UNSIGNED_BYTE, pixels);
            // let pixelR = pixels[4 * (y * this.webglContext.drawingBufferWidth + x)];
            // let pixelG = pixels[4 * (y * this.webglContext.drawingBufferWidth + x) + 1];
            // let pixelB = pixels[4 * (y * this.webglContext.drawingBufferWidth + x) + 2];
            // let pixelA = pixels[4 * (y * this.webglContext.drawingBufferWidth + x) + 3];
        }
        
        let color = rgbToHex(pixel[0], pixel[1], pixel[2]);
        this.graph.fillStyle(`0x${color}`, 1);
        this.graph.fillRectShape(this.rect);

        this.rgb.text = `RGB = ${pixel[0]}, ${pixel[1]}, ${pixel[2]}`;
        this.hex.text = `HEX = #${color}`;

    }
    
    update() {

        this.color(this.mouse.x, this.mouse.y);
    }
}

export default Colorpicker;