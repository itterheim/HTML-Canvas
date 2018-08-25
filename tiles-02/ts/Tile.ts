import * as colors from './colors';
import { TilePosition } from './TilePosition';
import { TileType } from './TileType';

export class Tile {
    public type: TileType = null;
    public position: TilePosition = null;

    constructor (x: number, y: number, type: TileType = new TileType()) {
        this.position = new TilePosition(x, y);
        this.type = type;
    }

    public render (ctx: CanvasRenderingContext2D, size: number) {
        const top = this.position.y * size;
        const left = this.position.x * size;

        // north
        ctx.beginPath();
        ctx.fillStyle = this.getColor('north');
        ctx.moveTo(left, top);
        ctx.lineTo(left + size, top);
        ctx.lineTo(left + size / 2, top + size / 2);
        ctx.closePath();
        ctx.fill();

        // east
        ctx.beginPath();
        ctx.fillStyle = this.getColor('east');
        ctx.moveTo(left + size, top);
        ctx.lineTo(left + size / 2, top + size / 2);
        ctx.lineTo(left + size, top + size);
        ctx.closePath();
        ctx.fill();

        // south
        ctx.beginPath();
        ctx.fillStyle = this.getColor('south');
        ctx.moveTo(left, top + size);
        ctx.lineTo(left + size, top + size);
        ctx.lineTo(left + size / 2, top + size / 2);
        ctx.closePath();
        ctx.fill();

        // west
        ctx.beginPath();
        ctx.fillStyle = this.getColor('west');
        ctx.moveTo(left, top);
        ctx.lineTo(left + size / 2, top + size / 2);
        ctx.lineTo(left, top + size);
        ctx.closePath();
        ctx.fill();

        // ctx.beginPath();
        // ctx.strokeStyle = '#000';
        // ctx.strokeRect(left + 0.5, top + 0.5, size - 1, size - 1);
    }

    private getColor(position: string) {
        const missingCollor = colors.UNDEFINED;

        if (!this.type) { return missingCollor; }
        return this.type.getColor(position) || missingCollor;
    }
}
