import { Collider } from './Collider';
import { Controls } from './Controls';
import { ICollidable } from './ICollidable';
import { IPoint } from './IPoint';
import { TileMap } from './TileMap';

export class Player implements IPoint, ICollidable {
    public width: number = 0.8;
    public height: number = 0.8;

    constructor (public x = 0, public y = 0) {}

    public update (controls: Controls, collider: Collider, delta: number) {
        const speed = controls.shift ? delta / 60 : 0.5 * delta / 60;

        if (controls.left) { this.x -= speed; }
        if (controls.right) { this.x += speed; }
        if (controls.up) { this.y -= speed; }
        if (controls.down) { this.y += speed; }

        collider.collide(this);
    }

    public render (ctx: CanvasRenderingContext2D, tileSize: number) {
        ctx.fillStyle = '#700070';
        ctx.fillRect(
            Math.round(ctx.canvas.width / 2) - Math.round(this.width * tileSize / 2),
            Math.round(ctx.canvas.height / 2) - Math.round(this.height * tileSize / 2),
            Math.round(this.width * tileSize),
            Math.round(this.height * tileSize)
        );
    }
}
