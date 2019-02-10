import { Worm } from './Worm';

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private worms: Worm[] = [];

    constructor () {
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx = this.canvas.getContext('2d');

        document.body.insertAdjacentElement('afterbegin', this.canvas);

        const area = { width: this.canvas.width, height: this.canvas.height };
        for (let i = 0; i < 20; i++) {
            const size = 10 + Math.floor(Math.random() * 100);
            this.worms.push(new Worm(area, size, 0.25 + Math.random() * 2));
        }

        this.run();
    }

    public run () {
        const update = (t: number) => {
            window.anim = window.requestAnimationFrame(update);

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (const worm of this.worms) {
                worm.step();
            }

            this.render(t);
        };

        window.anim = window.requestAnimationFrame(update);
    }

    private render (t: number) {
        for (const worm of this.worms) {
            worm.render(this.ctx, t);
        }
    }
}
