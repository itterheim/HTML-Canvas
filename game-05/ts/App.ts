import { Game } from './Game';

declare global {
    interface Window {
        anim: number;
        interval: number;
        timeout: number;
    }
}

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private game: Game;

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

        this.run();
    }

    private run () {
        console.clear();

        this.game = new Game();

        let previousTime = 0;
        const step = (time: number) => {
            window.anim = window.requestAnimationFrame((t) => step(t));
            this.clear();

            this.game.update(time, time - previousTime);
            this.game.render(this.ctx);

            previousTime = time;
        };

        window.anim = window.requestAnimationFrame((t) => step(t));
    }

    private clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private resize () {
        const w = window.innerWidth;
        const h = window.innerHeight;

        if (typeof window.devicePixelRatio === 'number') {
            const deviceScale = Math.min(3.5, Math.floor(window.devicePixelRatio * 2) / 2);

            this.canvas.width = w * deviceScale;
            this.canvas.height = h * deviceScale;
        } else {
            // config.deviceScale = 1;
            this.canvas.width = w;
            this.canvas.height = h;
        }

        // config.tileSize = Math.floor(Math.min(this.canvas.width, this.canvas.height / config.minTiles));
    }
}
