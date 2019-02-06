import { ITile } from './ITile';

export class RectTile implements ITile {
    public readonly type = 'rect';

    constructor (public x: number, public y: number, public size: number) {}

    public render (ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = `rgba(0,150,225,${Math.random()})`;
        ctx.lineWidth = 2.5;
        ctx.strokeRect(this.x + 4, this.y + 4, this.size - 8, this.size - 8);
    }
}
