import { Tile } from './Tile';

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private padding = { x: 0, y: 0 };
    private tileSize = 50;

    private tiles: Tile[] = [];

    private mouse: { x: number, y: number };

    constructor () {
        const old = document.querySelector('canvas');
        if (old) { old.parentNode.removeChild(old); }

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.insertAdjacentElement('afterbegin', this.canvas);

        window.onresize = () => {
            this.resize();
            this.run();
        };
        this.resize();

        const mouseCallback = (e) => {
            if (typeof window.devicePixelRatio === 'number') {
                this.mouse = {
                    x: e.clientX * window.devicePixelRatio,
                    y: e.clientY * window.devicePixelRatio
                };
            } else {
                this.mouse = {
                    x: e.clientX,
                    y: e.clientY
                };
            }
            window.requestAnimationFrame(() => this.render());
        };

        window.onmousemove = mouseCallback;
        window.ontouchmove = mouseCallback;

        this.run();
    }

    private run () {

        this.padding.x = (this.canvas.width % this.tileSize) / 2;
        this.padding.y = (this.canvas.height % this.tileSize) / 2;

        const nx = Math.floor(this.canvas.width / this.tileSize);
        const ny = Math.floor(this.canvas.height / this.tileSize);

        this.tiles = [];
        for (let i = 0; i < nx * ny; i++) {
            this.tiles.push(new Tile(
                this.padding.x + (i % nx * this.tileSize),
                this.padding.y + Math.floor(i / nx) * this.tileSize,
                this.tileSize
            ));
        }

        this.render();
    }

    private render () {
        this.clear();
        for (const tile of this.tiles) {
            tile.render(this.ctx, this.mouse);
        }
    }

    private clear () {
        console.clear();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private resize () {
        const w = document.body.clientWidth;
        const h = document.body.clientHeight;

        if (typeof window.devicePixelRatio === 'number') {
            this.canvas.width = w * window.devicePixelRatio;
            this.canvas.height = h * window.devicePixelRatio;
        } else {
            this.canvas.width = w;
            this.canvas.height = h;
        }

        this.mouse = {
            x: 1 / 3 * this.canvas.width,
            y: 1 / 3 * this.canvas.height
        };
    }
}
