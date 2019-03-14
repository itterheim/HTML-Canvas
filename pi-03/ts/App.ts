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

    private scale = 12;

    private size: Point;
    private padding: Point;

    private colors: { [key: string]: number[] } = {};

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

        this.size = {
            x: Math.floor(this.canvas.width / this.scale),
            y: Math.floor(this.canvas.height / this.scale)
        };

        this.padding = {
            x: (this.canvas.width - (this.size.x * this.scale)) / 2,
            y: (this.canvas.height - (this.size.y * this.scale)) / 2
        };

        let i = 0;
        const max = Math.min(this.size.x * this.size.y, Pi.length);

        let history: string[] = [];

        const colorOffset = Math.random() * 360;
        for (let j = 0; j < 10; j++) {
            history[j.toString()] = [];
            this.colors[j.toString()] = HSBtoRGB([(colorOffset + 360 * j / 10) % 360, 0.7, 200]);
        }

        const step = (time: number) => {
            if (i >= max) { return; }

            window.anim = window.requestAnimationFrame((t) => step(t));

            for (let j = 0; j < 8; j++) {
                const n = Pi[i];

                if (history[0] === n) {
                    history.push(n);
                } else {
                    history = [n];
                }

                this.renderValue(i, n, history);

                i++;
            }

        };

        window.anim = window.requestAnimationFrame((t) => step(t));
    }

    private renderValue (i: number, n: string, history: string[]) {
        const xi = i % this.size.x;
        const yi = Math.floor(i / this.size.x);
        const x = this.padding.x + xi * this.scale + this.scale / 2;
        const y = this.padding.y + yi * this.scale + this.scale / 2;

        if (history.length > 1 || n === Pi[i + 1]) {
            this.ctx.fillStyle = `rgba(${this.colors[n].join(',')}, 1)`;
            this.ctx.beginPath();
            this.ctx.arc(x + 1, y + 1, this.scale / 2 - 1, 0, Math.PI * 2, false);
            this.ctx.fill();
        }

        if (i === 0) { return; }

        const diff = parseInt(Pi[i - 1], 10) - parseInt(n, 10);
        if (diff > 0) {
            this.ctx.fillStyle = `rgba(${this.colors[n].join(',')}, 0.2)`;
            this.ctx.beginPath();
            this.ctx.arc(x + 1, y + 1, this.scale / 2 - 1, 0, Math.PI * 2, false);
            this.ctx.fill();
        } else if (diff < 0) {
            this.ctx.strokeStyle = `rgba(${this.colors[n].join(',')}, 0.4)`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(x + 1, y + 1, this.scale / 2 - 1 - this.ctx.lineWidth / 2, 0, Math.PI * 2, false);
            this.ctx.stroke();
        }

        // this.ctx.fillStyle = '#000';
        // this.ctx.textAlign = 'center';
        // this.ctx.textBaseline = 'middle';
        // this.ctx.font = `${this.scale / 2}px sans-serif`;
        // this.ctx.fillText(n, x, y + 1);
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
