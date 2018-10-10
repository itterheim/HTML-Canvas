import { Vector } from './Vector';

export class Ship {
    private forces: Vector[] = [];
    private force: Vector = new Vector(0, 0);
    private engine: number = 0;
    private fuel = 200;

    constructor (private position: Vector, private view: [number, number]) {
        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp') {
                this.engine = Math.min(1, this.engine + 0.1);
            } else if (e.key === 'ArrowDown') {
                this.engine = Math.max(0, this.engine - 0.1);
            }
        });
    }

    public setEnginePower (power: number) {
        this.engine = Math.max(0, Math.min(1, power));
    }

    public applyForce (force: Vector): void {
        this.forces.push(force);
    }

    public getHeight() {
        return this.view[1] - this.position.y;
    }

    public getEnginePower() {
        return this.engine;
    }

    public getDownForce() {
        return this.force.y;
    }

    public update (t: number): number {
        this.applyEngineForce(t);

        this.force = this.forces.reduce((p, f) => {
            p.add(f);
            return p;
        }, this.force);
        this.position.add(this.force);

        if (this.position.y >= this.view[1]) {
            this.position.y = this.view[1];
            // this.force.y = -this.force.y * 1;
            const landingForce = this.force.y;
            this.force.y = 0;

            return landingForce;
        }

        this.forces = [];

        return -1;
    }

    public draw (ctx: CanvasRenderingContext2D): void {
        const x = ~~(this.position.x - 5);
        const y = ~~(this.position.y - 20);

        ctx.fillStyle = '#fff';
        ctx.fillRect(x, y, 10, 20);

        ctx.fillStyle = '#5af';
        ctx.fillRect(x, y, 10, 20 * (this.fuel / 200));

        ctx.fillStyle = '#fa0';
        ctx.fillRect(x + 3, y + 20, 4, this.engine * 20);
        ctx.fillStyle = '#fd0';
        ctx.fillRect(x + 0, y + 20, 3, this.engine * 10);
        ctx.fillRect(x + 7, y + 20, 3, this.engine * 10);
    }

    private applyEngineForce (t: number) {
        if (this.fuel > 0) {
            this.forces.push(new Vector(0, -0.4 * this.engine));

            this.fuel = Math.max(0, this.fuel - (50 * t * this.engine));
            if (this.fuel === 0) { this.engine = 0; }
        }
    }
}
