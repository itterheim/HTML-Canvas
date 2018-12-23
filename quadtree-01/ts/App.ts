import { IPoint } from './IPoint';
import { TreeNode } from './Node';

declare global {
    // tslint:disable-next-line:interface-name
    interface Window { raf: number; }
}

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private mouse: IPoint;
    private add: boolean = false;
    private tree: TreeNode<IPoint>;
    private color: number[];

    constructor() {
        window.cancelAnimationFrame(window.raf);
        console.clear();

        this.canvas = document.getElementById('image') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d', { alpha: false });

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.tree = new TreeNode(0, 0, this.canvas.width, this.canvas.height);

        this.canvas.onmousemove = (e: MouseEvent) => {
            if (!this.add) {return; }

            const rect = this.canvas.getBoundingClientRect();
            this.mouse = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };

            // this.tree = new TreeNode(0, 0, this.canvas.width, this.canvas.height);
            // this.tree.add(this.mouse);
            for (let i = 0; i < 10; i++) {
                this.tree.add({
                    x: this.mouse.x + (Math.random() * 200 - 100),
                    y: this.mouse.y + (Math.random() * 200 - 100)
                });
            }

            this.run();
        };

        this.canvas.onclick = (e: MouseEvent) => {
            this.add = !this.add;
        //     const rect = this.canvas.getBoundingClientRect();
        //     const point = {
        //         x: e.clientX - rect.left,
        //         y: e.clientY - rect.top
        //     };

        //     this.tree.add(point);

        //     this.run();
        };

        this.canvas.onmouseout = () => {
            this.mouse = null;
            // this.tree = null;
            this.run();
        };

        this.color = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        ];

        this.run();
    }

    private run(): void {
        this.clear();

        // for (let i = 0; i < 50; i++) {
        //     this.tree.add({ x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height });
        // }

        if (this.tree) {
            this.tree.render(this.ctx, this.color);
        }

        // if (this.mouse) {
        //     this.ctx.fillStyle = '#000';
        //     this.ctx.fillRect(this.mouse.x - 5, this.mouse.y - 5, 10, 10);
        // }

        // window.raf = window.requestAnimationFrame(() => this.run());
    }

    private clear() {
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
