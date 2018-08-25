import * as colors from './colors';
import { Tile } from './Tile';
import { TileType } from './TileType';

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private tileSize: number = 20;
    private tiles: Tile[] = [];
    private types: TileType[] = [];

    constructor() {
        console.clear();
        this.canvas = document.getElementById('image') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.run();
    }

    public run(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < 2; i++) { this.types = this.types.concat(this.get0to4Types(colors.WATER)); }
        for (let i = 0; i < 100; i++) { this.types = this.types.concat(this.get0to4Types(colors.GRASS)); }

        this.types = this.types.concat(this.get1to3Types(colors.WATER, colors.GRASS));

        this.types = this.types.concat(this.get1to3Types(colors.WATER, colors.SAND));
        this.types = this.types.concat(this.get2to2Types(colors.WATER, colors.SAND));

        this.types = this.types.concat(this.get1to3Types(colors.GRASS, colors.SAND));
        this.types = this.types.concat(this.get2to2Types(colors.GRASS, colors.SAND));

        const xMax = Math.ceil(this.canvas.width / this.tileSize);
        const yMax = Math.ceil(this.canvas.height / this.tileSize);

        for (let y = 0; y < yMax; y ++) {
            for (let x = 0; x < xMax; x ++) {
                const west = x > 0 ? this.tiles.length - 1 : -1;
                const north = this.tiles.length - xMax;

                const type = y === 0 && x === 0 ? this.types[Math.floor(Math.random() * this.types.length)] : this.getType(this.tiles[west], this.tiles[north]);
                const tile = new Tile(x, y, type);

                this.tiles.push(tile);

            }
        }

        this.render();
    }

    private render (): void {
        for (const tile of this.tiles) {
            tile.render(this.ctx, this.tileSize);
        }
    }

    private getType(westTile: Tile, northTile: Tile): TileType {
        const west = westTile && westTile.type ? westTile.type.east : null;
        const north = northTile && northTile.type ? northTile.type.south : null;

        const tiles = this.types.filter((x) => (x.west === west || !west) && (x.north === north || !north));

        return tiles[Math.floor(Math.random() * tiles.length)];
    }

    private get1to3Types(color1: string, color2: string): TileType[] {
        return [
            new TileType(color1, color2, color2, color2),
            new TileType(color2, color1, color2, color2),
            new TileType(color2, color2, color1, color2),
            new TileType(color2, color2, color2, color1),
            new TileType(color2, color1, color1, color1),
            new TileType(color1, color2, color1, color1),
            new TileType(color1, color1, color2, color1),
            new TileType(color1, color1, color1, color2)
        ];
    }

    private get2to2Types(color1: string, color2: string): TileType[] {
        return [
            new TileType(color2, color2, color1, color1),
            new TileType(color1, color2, color2, color1),
            new TileType(color1, color1, color2, color2),
            new TileType(color2, color1, color1, color2),
            new TileType(color2, color1, color2, color1),
            new TileType(color1, color2, color1, color2)
        ];
    }

    private get0to4Types(color: string): TileType[] {
        return [new TileType(color, color, color, color)];
    }
}
