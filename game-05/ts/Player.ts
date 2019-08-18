import { Collider } from './Collider';
import { Controls } from './Controls';
import { ICollidable } from './ICollidable';
import { Vector } from './Vector';

export class Player implements ICollidable {
    public width = 0.8;
    public height = 0.8;
    public force = new Vector();

    constructor (public x: number = 0, public y: number = 0) { }

    public update (controls: Controls, collider: Collider, delta: number) {

        this.addGravity(delta);

        const controlsForce = 0.1;

        if (controls.up) { this.force.add(new Vector(0, -1 * controlsForce)); }
        if (controls.down) { this.force.add(new Vector(0, controlsForce)); }
        if (controls.left) { this.force.add(new Vector(-1 * controlsForce, 0)); }
        if (controls.right) { this.force.add(new Vector(controlsForce, 0)); }

        collider.collide(this);

        this.x += this.force.x;
        this.y += this.force.y;
        this.force.multiply(0.9);

        if (Math.abs(this.force.x) < 0.015) { this.force.x = 0; }
        if (Math.abs(this.force.y) < 0.015) { this.force.y = 0; }
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

    public addForce (force: Vector) {
        this.force.add(force);
    }

    private addGravity (delta: number) {
        this.force.add(new Vector(0, 0.5).multiply(1 / delta));
    }
}
