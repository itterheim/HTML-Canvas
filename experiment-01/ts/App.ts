import { Tile } from './Tile';
import { Vector } from './Vector';

declare global {
    interface Window {
        anim: number;
        timeout: number;
        interval: number;
    }
}

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private size = 100;
    private scale = 10;
    private diffusion = 0.1;

    private tiles: Tile[] = [];

    constructor () {
        const old = document.querySelector('canvas');
        if (old) { old.parentNode.removeChild(old); }

        window.cancelAnimationFrame(window.anim);
        window.clearInterval(window.interval);
        window.clearTimeout(window.timeout);

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.insertAdjacentElement('afterbegin', this.canvas);

        window.onresize = () => this.resize();
        this.resize();

        this.scale = (Math.min(this.canvas.width, this.canvas.height) / this.size);

        this.run();
    }

    private run () {
        console.clear();

        this.tiles = [];
        for (let xy = 0; xy < this.size; xy++) {
            for (let xi = 0; xi < this.size; xi++) {
                const tile = new Tile(xi, xy);
                this.tiles.push(tile);
            }
        }

        const step = (time: number) => {
            window.anim = window.requestAnimationFrame((t) => step(t));
            const speed = Vector.random(4);
            speed.add(new Vector(2, 0));
            this.tiles[this.xy(Math.floor(this.size / 4), Math.floor(this.size / 2))].addSpeed(speed);
            this.clear();
            this.update();
            this.render();
        };

        window.anim = window.requestAnimationFrame((t) => step(t));
    }

    private update () {
        for (const tile of this.tiles) {
            const tiles = [
                this.tiles[this.xy(tile.x + 1, tile.y + 1)],
                this.tiles[this.xy(tile.x + 1, tile.y - 1)],
                this.tiles[this.xy(tile.x - 1, tile.y + 1)],
                this.tiles[this.xy(tile.x - 1, tile.y - 1)],
                this.tiles[this.xy(tile.x + 1, tile.y)],
                this.tiles[this.xy(tile.x - 1, tile.y)],
                this.tiles[this.xy(tile.x, tile.y + 1)],
                this.tiles[this.xy(tile.x, tile.y - 1)]
            ].filter((x) => x);

            const bleed = this.diffusion * tiles.length;

            const speed = tile.getSpeed();
            const bleedSpeed = speed.clone();
            speed.multiply(1 - bleed);
            bleedSpeed.multiply(this.diffusion);

            for (const updateTile of tiles) {
                updateTile.getSpeed().add(bleedSpeed);
            }
        }

        for (const tile of this.tiles) {
            const speed = tile.getSpeed();
            if (!speed) { continue; }

            const position = this.getPosition(new Vector(tile.x, tile.y), speed);

            const newTile = this.tiles[this.xy(position.x, position.y)];
            if (newTile) {
                newTile.addSpeed(speed);
            }
        }

        for (const tile of this.tiles) {
            tile.update();
        }

    }

    private render () {
        for (const tile of this.tiles) {
            tile.render(this.ctx, this.scale);
        }
    }

    private clear () {
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
    }

    private xy (x: number, y: number): number {
        if (x < 0) { return -1; }
        if (y < 0) { return -1; }
        if (x >= this.size) { return -1; }
        if (x >= this.size) { return -1; }

        return y * this.size + x;
    }

    private getPosition (p: Vector, s: Vector): Vector {
        p.add(s);
        p.round();

        if (p.x >= this.size) {
            p.x = p.x - (p.x - this.size) - 1;
            s.x *= -1;
        }
        if (p.y >= this.size) {
            p.y = p.y - (p.y - this.size) - 1;
            s.y *= -1;
        }
        if (p.x < 0) {
            p.x *= -1;
            s.x *= -1;
        }
        if (p.y < 0) {
            p.y *= -1;
            s.y *= -1;
        }

        return p;
    }
}
