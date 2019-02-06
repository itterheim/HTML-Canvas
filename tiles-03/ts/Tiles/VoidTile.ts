import { ITile } from './ITile';

export class VoidTile implements ITile {
    public readonly type = 'void';

    constructor (public x: number, public y: number, public size: number) {}

    public render (ctx: CanvasRenderingContext2D) {
        ctx.clearRect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
    }
}
