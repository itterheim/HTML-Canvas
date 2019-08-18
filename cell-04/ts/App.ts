import { Automaton } from './Automaton';

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

    private padding = { v: 0, h: 0 };
    private tile = 10;
    private width = 0;
    private height = 0;

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

        const automaton = new Automaton(this.width, this.height);
        automaton.setRandom(0.995);

        const step = (time: number) => {
            window.anim = window.requestAnimationFrame((t) => step(t));
            automaton.update();
            this.clear();
            this.render(automaton.data);
        };
        window.anim = window.requestAnimationFrame((t) => step(t));
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

        this.tile = Math.floor(this.canvas.height / 70);

        this.width = Math.floor(this.canvas.width / this.tile);
        this.height = Math.floor(this.canvas.height / this.tile);
        this.padding.h = Math.floor((this.canvas.width - (this.width * this.tile)) / 2);
        this.padding.v = Math.floor((this.canvas.height - (this.height * this.tile)) / 2);
    }

    private render (data: number[]) {
        for (let i = 0; i < data.length; i++) {
            const x = i % this.width;
            const y = Math.floor(i / this.width);
            this.renderCell(data[i], x, y);
        }
    }

    private renderCell (value: number, x: number, y: number) {
        if (value <= 0) { return; }

        // this.ctx.fillStyle = '#000';
        this.ctx.fillStyle = `rgba(0,0,0,${value / 20})`;
        this.ctx.fillRect(
            this.padding.h + x * this.tile,
            this.padding.v + y * this.tile,
            this.tile,
            this.tile
        );
    }
}
