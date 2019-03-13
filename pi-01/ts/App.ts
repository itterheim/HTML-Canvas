import { HSBtoRGB } from './colors';
import { Pi } from './pi-10million';
// import { Pi } from './Pi';

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

    private scale = 5;

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

        let i = 0;
        const max = Pi.length;
        let point: Point = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
        const step = (time: number) => {
            if (i < max) {
                window.anim = window.requestAnimationFrame((t) => step(t));
            }
            for (let j = 0; j < 100; j++) {
                point = this.step(i, point);
                i++;
            }
        };

        window.anim = window.requestAnimationFrame((t) => step(t));
    }

    private step (i: number, point: Point): Point {
        const n = Pi[i];
        const next = this.getNext(n, point);

        const h = (i / 100);
        const s = 0.5 + Math.cos(i / 500) / 2;
        const b = 0.5 + Math.cos(i / 1000) / 2;
        const color = HSBtoRGB([h % 360, 0.5 + 0.5 * s, 100 + b * 155]);

        if (n === '0') {
            // this.ctx.strokeStyle = `#000`;
            this.ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
            this.ctx.beginPath();
            this.ctx.arc(next.x, next.y, this.scale / 2, 0, Math.PI * 2, false);
            this.ctx.fill();
        } else if (n === '5') {
            //
        } else {
            // this.ctx.strokeStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
            // this.ctx.lineWidth = 1.5;
            // this.ctx.lineCap = 'round';
            // this.ctx.beginPath();
            // this.ctx.moveTo(point.x, point.y);
            // this.ctx.lineTo(next.x, next.y);
            // this.ctx.stroke();
        }

        return next;
    }

    private getNext (n: string, point: Point): Point {
        let x = 0;
        let y = 0;

        switch (n) {
            case '0':
                break;
            case '5':
                break;
            case '1':
                y -= this.scale;
                break;
            case '2':
                x += this.scale;
                y -= this.scale;
                break;
            case '3':
                x += this.scale;
                break;
            case '4':
                x += this.scale;
                y += this.scale;
                break;
            case '6':
                y += this.scale;
                break;
            case '7':
                x -= this.scale;
                y += this.scale;
                break;
            case '8':
                x -= this.scale;
                break;
            case '9':
                x -= this.scale;
                y -= this.scale;
                break;
        }

        const next = {
            x: point.x + x,
            y: point.y + y
        };

        next.x = Math.max(0, next.x);
        next.x = Math.min(this.canvas.width, next.x);
        next.y = Math.max(0, next.y);
        next.y = Math.min(this.canvas.height, next.y);

        return next;
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
