import { Collider } from './Collider';
import { Controls } from './Controls';
import { IPoint } from './IPoint';
import { Player } from './Player';
import { TileMap } from './TileMap';
import { Vector } from './Vector';

export class Game {
    private map: TileMap;
    private player: Player;
    private collider: Collider;
    private controls: Controls;

    constructor () {
        this.controls = new Controls();
        this.player = new Player(2.5, 2.5);
        this.map = new TileMap(10, 10);
        this.collider = new Collider(this.map);
    }

    public update (time: number, delta: number) {
        // if (this.player.y > 20 || time > 2000) { return; }

        this.player.update(this.controls, this.collider, delta);
    }

    public render (ctx: CanvasRenderingContext2D) {
        const tileSize = 20;
        const offset: IPoint = {
            x: Math.round(ctx.canvas.width / 2) - Math.round(this.player.x * tileSize),
            y: Math.round(ctx.canvas.height / 2) - Math.round(this.player.y * tileSize)
        };

        this.map.render(ctx, offset, tileSize);
        this.player.render(ctx, tileSize);
    }
}
