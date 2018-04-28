import { CosEmitter } from './CosEmitter';
import { IEmitter } from './IEmitter';
import { NoiseEmitter } from './NoiseEmitter';
import { IRectangle, Rectangle } from './Rectangle';
import { SinEmitter } from './SinEmitter';

declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        raf: number;
    }
}

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private rectangles: Rectangle[] = [];
    private emitters: IEmitter[] = [];

    constructor() {
        window.cancelAnimationFrame(window.raf);
        console.clear();

        this.canvas = document.getElementById('image') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.emitters.push(new SinEmitter(100, 100, 1));
        this.emitters.push(new CosEmitter(this.canvas.width - 100, 100, 1));
        this.emitters.push(new SinEmitter(this.canvas.width - 100, this.canvas.height - 100, 1));
        console.log(this.emitters);

        const size = this.canvas.width / 100;
        for (let i = 0; i < this.canvas.width; i += size) {
            for (let j = 0; j < this.canvas.height; j += size) {
                this.rectangles.push(new Rectangle(i, j, size, size));
            }
        }

        this.run();
    }

    public run(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const increase = 0.0001;
        for (const emitter of this.emitters) {
            emitter.scale = (emitter.scale + increase) % 0.1;
        }

        for (const rect of this.rectangles) {
            const c = this.getCoefficient(rect.x, rect.y);
            this.renderRectangle(rect.getModified(c));
        }

        window.raf = window.requestAnimationFrame(() => this.run());
    }

    private renderRectangle(rect: IRectangle): void {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(60,120,255,0.2)';
        this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    }

    private getCoefficient (x: number, y: number): number {
        let c = 0;
        let n = 0;

        for (const emitter of this.emitters) {
            c += emitter.getValue(x, y);
            n++;
        }

        return (c / n) - 0.5;
    }
}
