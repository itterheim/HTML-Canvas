import { IPoint } from './IPoint';

export class TileMap {
    // private tiles: number[] = [
    //     0, 0, 0, 0, 0,
    //     0, 0, 0, 0, 0,
    //     0, 0, 0, 0, 0,
    //     0, 0, 0, 0, 0,
    //     1, 1, 1, 1, 1
    // ];
    private tiles: number[];

    constructor (private width: number, private height: number) {
        this.tiles = new Array(this.width * this.height);
        this.tiles.fill(0);

        this.tiles = this.tiles.map((value, i) => {
            const position = this.toPosition(i);
            if (position.y === 0 || position.y === this.height - 1 || position.x === 0 || position.x === this.width - 1) {
                return 1;
            }
            return value;
        });
    }

    public render (ctx: CanvasRenderingContext2D, offset: IPoint, tileSize: number) {

        for (let i = 0; i < this.tiles.length; i++) {
            const tile = this.tiles[i];
            if (tile) {
                const position = this.toPosition(i);

                ctx.fillStyle = '#000';
                ctx.fillRect(
                    offset.x + position.x * tileSize,
                    offset.y + position.y * tileSize,
                    tileSize,
                    tileSize
                );
            }
        }

    }

    public getTile (position: IPoint): number {
        if (position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height) {
            // console.log(position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height, this.toIndex(position));
            return this.tiles[this.toIndex(position)];
        }
        return undefined;
    }

    private toIndex (position: IPoint): number {
        return position.y * this.width + position.x;
    }

    private toPosition (index: number): IPoint {
        return {
            x: index % this.width,
            y: Math.floor(index / this.width)
        };
    }
}
