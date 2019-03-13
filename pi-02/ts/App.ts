import { HSBtoRGB } from './colors';
import { Pi } from './Pi';

declare global {
    interface Window {
        anim: number;
        timeout: number;
        interval: number;
    }
}

interface Point { x: number; y: number; }

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private scale = 50;
    private steps = 10;

    constructor () {
        const old = document.querySelector('canvas');
        if (old) { old.parentNode.removeChild(old); }

        window.cancelAnimationFrame(window.anim);
        window.clearInterval(window.interval);
        window.clearTimeout(window.timeout);

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.insertAdjacentElement('afterbegin', this.canvas);

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

        const w = Math.floor(this.canvas.width / this.scale);
        const h = Math.floor(this.canvas.height / this.scale);

        const padding: Point = {
            x: (this.canvas.width - (w * this.scale)) / 2,
            y: (this.canvas.height - (h * this.scale)) / 2
        };

        let i = 0;
        const max = Math.min(w * h * this.steps, Pi.length);

        let wi = 0;
        let hi = 0;

        let previous0 = 0;
        let previous1 = 0;

        const point: Point = {
            x: padding.x,
            y: padding.y
        };
        const step = (time: number) => {
            if (i < max - 1) {
                window.anim = window.requestAnimationFrame((t) => step(t));
            }

            for (let j = 0; j < 4 && i < max; j++) {
                if (i % this.steps === 0 && i > 0) { wi++; }
                if (wi >= w) {
                    hi++;
                    wi = 0;
                }
                point.x = padding.x + this.scale / 2 + wi * this.scale;
                point.y = padding.y + this.scale / 2 + hi * this.scale;

                const n = parseInt(Pi[i], 10);

                this.renderValue(point, previous0, previous1, n);

                i++;
                previous0 = previous1;
                previous1 = n;
            }

        };

        window.anim = window.requestAnimationFrame((t) => step(t));
    }

    private renderValue (point: Point, v0: number, v1: number, v2: number) {
        const diff0 = v0 - v1;
        const r0 = (9 + diff0) / 18;

        const diff1 = v1 - v2;
        const r1 = (9 + diff1) / 18;

        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = `rgba(0,0,0,${0.4 / this.steps}`;
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, this.scale / 2 - 4, 0, r1 * Math.PI * 2, diff1 < 0);
        this.ctx.stroke();

        this.ctx.fillStyle = `rgba(0,0,0,${0.8 / this.steps})`;
        this.ctx.beginPath();
        const from = r0 * Math.PI * 2 * (diff0 < 0 ? -1 : 1);
        const to = from + r1 * Math.PI * 2;
        this.ctx.arc(point.x, point.y, this.scale / 2 - 6, from, to);
        this.ctx.fill();
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
