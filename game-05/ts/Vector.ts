import { IPoint } from './IPoint';

export class Vector implements IPoint {
    constructor (public x: number = 0, public y: number = 0) {}

    public clone (): Vector {
        return new Vector(this.x, this.y);
    }

    public add (vector: Vector): Vector {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    public subtract (vector: Vector): Vector {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    public multiply (n: number): Vector {
        this.x *= n;
        this.y *= n;
        return this;
    }
}
