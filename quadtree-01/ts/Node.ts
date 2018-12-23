import { IPoint } from './IPoint';

const LIMIT = 3;
const PX_LIMIT = 1;

export class TreeNode<T extends IPoint> implements IPoint {
    public readonly x: number;
    public readonly y: number;
    public readonly w: number;
    public readonly h: number;

    private children: Array<TreeNode<T>> = [];
    private data: T[] = [];

    constructor (x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public add(data: T) {
        if (this.children.length > 0) {
            if (this.children[0].isInside(data)) {
                this.children[0].add(data);
            } else {
                this.children[1].add(data);
            }
        } else {
            this.data.push(data);

            if (this.data.length >= LIMIT && (this.w > PX_LIMIT || this.h > PX_LIMIT)) {
                this.split();
            }
        }
    }

    public isInside (data: IPoint): boolean {
        return data.x >= this.x && data.x < this.x + this.w
               &&
               data.y >= this.y && data.y < this.y + this.h;
    }

    public render(ctx: CanvasRenderingContext2D, color) {
        if (this.children.length === 0) {
            ctx.beginPath();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.fillStyle = `rgb(${color.join(',')})`;

            ctx.rect(this.x, this.y, this.w, this.h);

            ctx.fill();
            // ctx.stroke();
        }

        // if (this.data.length > 0) {
        //     ctx.fillStyle = '#f00';
        //     for (const d of this.data) {
        //         ctx.beginPath();
        //         ctx.arc(d.x - 1, d.y - 1, 2, 0, Math.PI * 2);
        //         ctx.fill();
        //     }
        // }

        for (const node of this.children) {
            const newColor: number[] = [...color];

            const i = Math.floor(Math.random() * 3);
            const r = Math.round(Math.random() * 20) - 10;
            // newColor[i] = Math.min(255, Math.max(0, newColor[i] + r));
            newColor[i] = newColor[i] + r;

            // console.log(i, color[i], newColor[i]);

            node.render(ctx, newColor);
        }
    }

    private split() {
        let node1: TreeNode<T>;
        let node2: TreeNode<T>;
        if (this.w > this.h) {
            const w = Math.floor(this.w / 2);
            node1 = new TreeNode<T>(this.x,     this.y, w,          this.h);
            node2 = new TreeNode<T>(this.x + w, this.y, this.w - w, this.h);
        } else {
            const h = Math.floor(this.h / 2);
            node1 = new TreeNode<T>(this.x, this.y,     this.w, h);
            node2 = new TreeNode<T>(this.x, this.y + h, this.w, this.h - h);
        }

        for (const d of this.data) {
            if (node1.isInside(d)) {
                node1.add(d);
            } else {
                node2.add(d);
            }
        }

        this.data = [];

        this.children = [node1, node2];
    }
}
