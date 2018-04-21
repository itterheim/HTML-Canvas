import { Point } from './Point';

declare global {
    // tslint:disable-next-line:interface-name
    interface Window { raf: number; }
}

const PI2 = Math.PI * 2;

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private emitters = [];
    private filledPoints: Point[] = [];
    private strokedPoints: Point[] = [];

    constructor() {
        window.cancelAnimationFrame(window.raf);
        console.clear();

        this.canvas = document.getElementById('image') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        // this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.emitters = [
            {
                getCoefficient: (distance: number) => 0 + (Math.sin(0.02 * distance) + 1) / 2,
                x: this.canvas.width - 200,
                y: 200
            },
            {
                getCoefficient: (distance: number) => 0 + (Math.sin(0.02 * distance) + 1) / 2,
                x: 200,
                y: 200
            },
            {
                getCoefficient: (distance: number) => 0 + (Math.sin(0.02 * distance) + 1) / 2,
                x: this.canvas.width / 2,
                y: this.canvas.height - 200
            }
        ];

        const w = this.canvas.width;
        const h = this.canvas.height;
        const n = w * h;

        for (let i = 0; i < n / 500; i++) {
            this.filledPoints.push(new Point(w, h));
        }

        for (let i = 0; i < n / 5000; i++) {
            this.strokedPoints.push(new Point(w, h));
        }
        console.log('points:', this.strokedPoints.length + this.filledPoints.length);

        this.run();
    }

    public run(): void {
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (const point of this.filledPoints) {
            this.renderCircle(point, true, false);
            point.update();
        }

        for (const point of this.strokedPoints) {
            this.renderCircle(point, false, true);
            point.update();
        }

        window.raf = window.requestAnimationFrame(() => this.run());
    }

    private renderCircle(point, fill, stroke): void {
        const c = this.getCoefficient(point.x, point.y);
        const colorValues = this.getColorValues(point.x, point.y);

        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, c * 20, 0, PI2, false);

        if (fill) {
            this.ctx.fillStyle = `rgba(${colorValues},0.5)`;
            this.ctx.fill();
        }

        if (stroke) {
            this.ctx.strokeStyle = `rgba(0,0,0,${0.1 + c * 0.3})`;
            this.ctx.lineWidth = 1 + c * 3;
            this.ctx.stroke();
        }
    }

    private getCoefficient (x: number, y: number): number {
        let c = 0;
        let n = 0;

        for (const emmitter of this.emitters) {
            c += emmitter.getCoefficient(Math.sqrt(Math.pow(x - emmitter.x, 2) + Math.pow(y - emmitter.y, 2)));
            n++;
        }

        return c / n;
    }

    private getColorValues (x: number, y: number): string {
        const emmitter = this.emitters[this.emitters.length - 1];
        const distance = Math.sqrt(Math.pow(x - emmitter.x, 2) + Math.pow(y - emmitter.y, 2));
        const c = emmitter.getCoefficient(distance);

        const rgb: [number, number, number] = [102, 232, 255];
        rgb[0] += Math.round(c * -102);
        rgb[1] += Math.round(c * -72);
        rgb[2] += Math.round(c * -29);

        return rgb.join(',');
    }
}
