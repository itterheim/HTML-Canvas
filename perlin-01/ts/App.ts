import { Noise } from './Noise';

declare global {
    // tslint:disable-next-line:interface-name
    interface Window { raf: number; }
}

// const PI2 = Math.PI * 2;

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private noise: Noise;
    private distribution: number[] = new Array(100).fill(0);

    constructor() {
        window.cancelAnimationFrame(window.raf);
        console.clear();

        this.canvas = document.getElementById('image') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.noise = new Noise(20, 20);

        this.run();
    }

    private run(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const step = 10000;
        const max = this.canvas.width * this.canvas.height;

        this.scheduleRender(0, step, max);
    }

    private scheduleRender(index: number, count: number, max: number) {
        window.requestAnimationFrame(() => {
            this.render(index, count);
            if (index + count < max) {
                this.scheduleRender(index + count, count, max);
            }
        });
    }

    private render(index: number, count: number) {
        for (let i = index; i < index + count; i++) {
            const x = i % this.canvas.width;
            const y = ~~(i / this.canvas.width);

            const n = this.getNoise(x, y);
            const alpha = Math.round(n * 100) / 100;

            this.distribution[Math.floor(n * 100)]++;

            this.ctx.fillStyle = `rgba(0,0,0,${alpha})`;
            this.ctx.fillRect(x, y, 1, 1);
        }
    }

    private getNoise (x: number, y: number): number {
        const d = this.canvas.width / 20;
        // return this.noise.get(x / d, y / d);
        return this.noise.getOctave(x / d, y / d, 6, 0.5);
    }
}
