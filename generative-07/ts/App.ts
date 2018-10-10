import { Ship } from './Ship';
import { Vector } from './Vector';

declare global {
    // tslint:disable-next-line:interface-name
    interface Window { raf: number; }
}

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private ship: Ship;
    private startTime: number;

    constructor() {
        window.cancelAnimationFrame(window.raf);
        console.clear();

        this.canvas = document.getElementById('image') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.reset();

        this.run();
    }

    private run(): void {

        let time: number = 0;
        const renderer = (t?: number) => {
            if (t && time) {
                this.clear();
                this.render(time === 0 ? time : (t - time) / 1000);
                time = t;
            } else if (t) {
                time = t;
            }

            window.raf = window.requestAnimationFrame((x) => renderer(x));
        };

        renderer();
    }

    private render (t: number) {
        if (t === 0) { return; }

        const gForce = new Vector(0, t * 10);
        this.ship.applyForce(gForce);
        const landingForce = this.ship.update(t);
        this.ship.draw(this.ctx);

        if (landingForce >= 0) {
            if (landingForce >= 4) {
                console.log('CRASH', landingForce);
            } else { console.log('LAND', landingForce); }
            this.reset();
        }
    }

    private reset() {
        this.ship = new Ship(new Vector(~~(this.canvas.width / 2), 100), [this.canvas.width, this.canvas.height]);
        this.startTime = new Date().getTime();
    }

    private clear (): void {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
