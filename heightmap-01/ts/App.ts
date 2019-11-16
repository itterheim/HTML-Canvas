import { HeightMap } from './Heightmap';

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

        window.onresize = () => this.resize();
        this.resize();

        this.run();
    }

    private run () {
        console.clear();

        const tileSize = 30;
        const size = 2 * Math.ceil(Math.max(this.canvas.width, this.canvas.height) / tileSize);

        const offset = [this.canvas.width, this.canvas.height].map((x) => Math.round(x / 2) - Math.round(size * tileSize / 2));
        const map = new HeightMap(size, size);

        let drag: number[];
        this.canvas.onmousedown = (e) => drag = [e.clientX, e.clientY];
        this.canvas.onmouseup = () => drag = undefined;
        this.canvas.onmouseout = () => drag = undefined;
        this.canvas.onmousemove = (e) => {
            if (drag) {
                const diff = [drag[0] - e.clientX, drag[1] - e.clientY];
                offset.forEach((_, i) => offset[i] -= diff[i]);
                drag = [e.clientX, e.clientY];
            }
        };

        this.canvas.ontouchstart = (e) => drag = [e.touches[0].clientX, e.touches[0].clientY];
        this.canvas.ontouchend = () => drag = undefined;
        this.canvas.ontouchcancel = () => drag = undefined;
        this.canvas.ontouchmove = (e) => {
            if (drag) {
                const diff = [drag[0] - e.touches[0].clientX, drag[1] - e.touches[0].clientY]
                    .map((x) => x * window.devicePixelRatio);
                offset.forEach((_, i) => offset[i] -= diff[i]);
                drag = [e.touches[0].clientX, e.touches[0].clientY];
            }
        };

        const step = (_: number) => {
            window.anim = window.requestAnimationFrame((t) => step(t));
            this.clear();

            map.render(this.ctx, offset[0], offset[1], tileSize);
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
            this.canvas.width = w * window.devicePixelRatio;
            this.canvas.height = h * window.devicePixelRatio;
        } else {
            this.canvas.width = w;
            this.canvas.height = h;
        }
    }
}
