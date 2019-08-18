import { Collider } from './Collider';
import { Controls } from './Controls';
import { IPoint } from './IPoint';
import { Player } from './Player';
import { TileMap } from './TileMap';

export class Game {
    private tileMap: TileMap;
    private player: Player;
    private controls: Controls;
    private collider: Collider;

    constructor () {
        this.tileMap = new TileMap(10, 10);
        this.player = new Player(5, 5);
        this.controls = new Controls();

        this.collider = new Collider(this.tileMap);
    }

    public update (time: number, delta: number) {
        this.player.update(this.controls, this.collider, delta);
    }

    public render (ctx: CanvasRenderingContext2D) {
        const tileSize = 20;
        const offset: IPoint = {
            x: Math.round(ctx.canvas.width / 2) - Math.round(this.player.x * tileSize),
            y: Math.round(ctx.canvas.height / 2) - Math.round(this.player.y * tileSize)
        };

        this.tileMap.render(ctx, offset, tileSize);
        this.player.render(ctx, tileSize);
    }
}
