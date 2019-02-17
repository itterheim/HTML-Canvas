import { Vector } from './Vector';

export class Tile {
    private in: Vector[] = [];
    private out: Vector = null;

    constructor (public x: number, public y: number) {}

    public render (ctx: CanvasRenderingContext2D, scale: number) {
        // ctx.beginPath();
        // ctx.strokeRect(this.x * scale, this.y * scale, scale, scale);

        if (this.out) {
            const r = this.out.magnitude / 2;
            const color = `rgba(0,0,0,${Math.min(r, 1)})`;
            ctx.fillStyle = color;
            ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
        }

        // if (this.out) {
        //     ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        //     ctx.moveTo(
        //         this.x * scale + scale / 2,
        //         this.y * scale + scale / 2
        //     );
        //     ctx.lineTo(
        //         this.x * scale + scale / 2 + this.out.x * scale,
        //         this.y * scale + scale / 2 + this.out.y * scale
        //     );
        //     ctx.stroke();
        // }
    }

    public getSpeed (): Vector {
        if (!this.out) {
            this.out = new Vector();
        }
        return this.out;
    }

    public addSpeed (speed: Vector) {
        this.in.push(speed);
    }

    public update () {
        if (this.in && this.in.length > 0) {
            this.out = this.in.reduce((v, x) => {
                v.add(x);
                return v;
            }, new Vector());
        } else {
            this.out = null;
        }
        this.in = [];
    }
}
