import { Config } from './config';

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
    private config: Config;

    private tiles: boolean[] = [];
    private w = 10;
    private h = 10;

    private scale = 10;
    private padding: { x: number, y: number } = { x: 0, y: 0 };

    private progress = 0;

    constructor () {
        const old = document.querySelector('canvas');
        if (old) { old.parentNode.removeChild(old); }

        window.cancelAnimationFrame(window.anim);
        window.clearInterval(window.interval);
        window.clearTimeout(window.timeout);

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.insertAdjacentElement('afterbegin', this.canvas);

        this.config = new Config(this.scale, (scale: number) => {
            window.cancelAnimationFrame(window.anim);
            this.scale = scale;
            this.resize();
            this.run();
        });
        window.onresize = () => {
            window.cancelAnimationFrame(window.anim);
            this.resize();
            this.run();
        };
        this.resize();

        this.run();
    }

    private run () {
        console.clear();

        this.tiles = [];
        this.progress = 0;

        this.w = Math.floor((this.canvas.width - 0.1 * this.canvas.width) / this.scale);
        this.h = Math.floor((this.canvas.height - 0.1 * this.canvas.height) / this.scale);

        this.padding.x = Math.floor((this.canvas.width - this.w * this.scale) / 2);
        this.padding.y = Math.floor((this.canvas.height - this.h * this.scale) / 2);

        let n = 0;
        const limit = this.w * this.h / 1;
        const step = (time: number) => {
            if (n < limit) { window.anim = window.requestAnimationFrame((t) => step(t)); }
            this.progress = n / (this.w * this.h);
            for (let i = 0; i < 10 && n < limit; i++) {
                this.addCell(n === 0);
                n++;
            }
        };

        this.clear();
        window.anim = window.requestAnimationFrame((t) => step(t));
    }

    private addCell (random: boolean = false) {
        const available: number[] = [];
        const count = this.w * this.h;

        for (let i = 0; i < count; i++) {
            if (!this.tiles[i]) {
                const x = i % this.w;
                const y = Math.floor(i  / this.w);
                let neighbours = 0;
                if (x < this.w - 1 && this.tiles[i + 1]) { neighbours++; }
                if (x > 0 && this.tiles[i - 1]) { neighbours++; }
                if (y < this.h - 1 && this.tiles[i + this.w]) { neighbours++; }
                if (y > 0 && this.tiles[i - this.w]) { neighbours++; }

                const probability = this.neighboursToProbability(neighbours);
                for (let j = 0; j < probability; j++) { available.push(i); }
            }
        }

        let selected = -1;
        if (available.length > 0) {
            selected = available[Math.floor(Math.random() * available.length)];
        } else if (random) {
            selected = Math.floor(Math.random() * count);
        }
        if (selected >= 0) {
            this.tiles[selected] = true;

            const tx = selected % this.w;
            const ty = Math.floor(selected / this.w);
            this.renderTile(tx, ty);
        }

    }

    private neighboursToProbability (neighbours: number): number {
        // return neighbours < 2 ? 0 : 1;

        return this.config.probabilities[neighbours];

        // fill with noise
        // switch (neighbours) {
        //     case 0: return 0;
        //     case 1: return 10;
        //     case 2: return 1;
        //     case 3: return 2;
        //     case 4: return 100;
        //     default: return 0;
        // }

        // fill without noise
        // switch (neighbours) {
        //     case 0: return 0;
        //     case 1: return 1;
        //     case 2: return 2;
        //     case 3: return 4;
        //     case 4: return 8;
        //     default: return 0;
        // }

        // empty 2x2 spaces
        // switch (neighbours) {
        //     case 0: return 0;
        //     case 1: return 1;
        //     case 2: return 0;
        //     case 3: return 5;
        //     case 4: return 10;
        //     default: return 0;
        // }

        // switch (neighbours) {
        //     case 0: return 0;
        //     case 1: return 20;
        //     case 2: return 1;
        //     case 3: return 5;
        //     case 4: return 5;
        //     default: return 0;
        // }
    }

    private renderTile (x: number, y: number) {
        // this.ctx.fillStyle = `rgba(0, 0, 0, ${1 - (0.2 + (0.8 * this.progress))})`;
        this.ctx.fillStyle = `rgba(0, 0, 0, ${0.2 + (0.8 * this.progress)})`;
        this.ctx.fillRect(
            this.padding.x + x * this.scale,
            this.padding.y + y * this.scale,
            this.scale,
            this.scale
        );
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
}
