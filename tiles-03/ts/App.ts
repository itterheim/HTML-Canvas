import { CircleTile } from './Tiles/CircleTile';
import { ITile } from './Tiles/ITile';
import { RectTile } from './Tiles/RectTile';
import { Types } from './Tiles/Tiles';
import { VoidTile } from './Tiles/VoidTile';

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private offset: number = 200;
    private tileSize: number = 20;
    private tiles: ITile[][] = [];

    private padding: {w: number, h: number} = { w: 0, h: 0 };
    private count: {w: number, h: number} = { w: 0, h: 0 };

    constructor () {
        console.clear();
        this.canvas = document.getElementById('image') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.count.w = Math.floor((this.canvas.width - this.offset) / this.tileSize);
        this.padding.w = Math.round((this.canvas.width - (this.count.w * this.tileSize)) / 2) + 0.5;
        this.count.h = Math.floor((this.canvas.height - this.offset) / this.tileSize);
        this.padding.h = Math.round((this.canvas.height - (this.count.h * this.tileSize)) / 2) + 0.5;

        this.run();
    }

    public run () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let x = 0; x < this.count.w; x++) {
            this.tiles[x] = [];

            for (let y = 0; y < this.count.h; y++) {
                const tile = this.getTile(x, y);
                this.tiles[x].push(tile);
            }
        }

        this.render();
    }

    private render () {
        for (const column of this.tiles) {
            for (const tile of column) {
                tile.render(this.ctx);
            }
        }

        for (let xi = 0; xi < this.tiles.length - 1; xi++) {
            for (let yi = 0; yi < this.tiles[xi].length; yi++) {
                if (this.tiles[xi][yi].type === 'void') {
                    this.drawLine(this.tiles[xi][yi], this.tiles[xi + 1][yi + 1]);
                    this.drawLine(this.tiles[xi][yi], this.tiles[xi + 1][yi - 1]);
                }
            }
        }

        console.log(this.tiles);
    }

    private drawLine (from, to) {
        if (!from || !to) { return; }
        if (from.type !== 'void' || to.type !== 'void') { return; }

        const offset = this.tileSize / 2;

        this.ctx.beginPath();
        this.ctx.strokeStyle = '#faa';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'square';
        this.ctx.moveTo(from.x + offset, from.y + offset);
        this.ctx.lineTo(to.x + offset, to.y + offset);
        this.ctx.stroke();
    }

    private getTile (xi: number, yi: number): ITile {
        const x = this.padding.w + xi * this.tileSize;
        const y = this.padding.h + yi * this.tileSize;

        const exclude: string[] = [];

        const top = this.tiles[xi][yi - 1];
        const left = (this.tiles[xi - 1] || [])[yi];
        if (top) { exclude.push(top.type); }
        if (left) { exclude.push(left.type); }

        const available = Types.filter((a) => exclude.indexOf(a.type) === -1);
        const n = Math.floor(Math.random() * available.length);

        return new available[n].cls(x, y, this.tileSize);
    }
}
