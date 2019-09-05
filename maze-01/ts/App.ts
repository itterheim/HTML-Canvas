import { Maze } from './Maze';

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

    constructor () {
        const old = document.querySelector('canvas');
        if (old) { old.parentNode.removeChild(old); }

        window.cancelAnimationFrame(window.anim);
        window.clearInterval(window.interval);
        window.clearTimeout(window.timeout);

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.insertAdjacentElement('afterbegin', this.canvas);

        // window.onresize = () => this.resize();
        this.resize();

        this.run();
    }

    private run () {
        console.clear();

        const tile = 15;
        const maze = new Maze(Math.floor((this.canvas.width - 50) / tile), Math.floor((this.canvas.height - 50) / tile));

        const step = (time: number) => {
            if (!maze.done) {
                window.anim = window.requestAnimationFrame((t) => step(t));
                for (let i = 0; i < 20; i++) { maze.update(0.01); }
            }
            this.clear();
            maze.render(this.ctx, tile);
        };

        window.anim = window.requestAnimationFrame((t) => step(t));
    }

    private clear () {
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
