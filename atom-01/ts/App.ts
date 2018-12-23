import { Atom } from './Atom';
import { elements } from './elements';
import { Renderer } from './Renderer';

declare global {
    // tslint:disable-next-line:interface-name
    interface Window { interval: number; }
}

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private renderer: Renderer;

    constructor () {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        // this.canvas.width = window.innerWidth;
        // this.canvas.height = window.innerHeight;

        this.ctx = this.canvas.getContext('2d');
        this.renderer = new Renderer(this.ctx);

        window.onresize = () => this.resize();
        this.resize();

        document.body.insertAdjacentElement('afterbegin', this.canvas);

        this.run();
    }

    public run (): void {
        let i = 0;

        const render = () => {
            this.renderer.clear();

            const test = new Atom(elements[i]);
            this.renderer.drawAtom(test);

            i++;

            if (i >= elements.length) { i = 0; }
        };

        render();

        window.onclick = () => {
            window.clearInterval(window.interval);
            render();
        };
        window.interval = window.setInterval(() => render(), 500);
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
