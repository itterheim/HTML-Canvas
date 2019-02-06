import { ITile } from './ITile';

export class CircleTile implements ITile {
    public readonly type = 'circle';

    constructor (public x: number, public y: number, public size: number) {}

    public render (ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(150, 225, 0, ${Math.random()})`;

        ctx.beginPath();
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, (this.size / 2) - 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}
