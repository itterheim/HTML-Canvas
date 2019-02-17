export class Vector {

    public static random (limit: number = 1): Vector {
        const x = Math.random() * 2 * limit - limit;
        const y = Math.random() * 2 * limit - limit;

        return new Vector(x, y);
    }

    public get magnitude (): number { return Math.sqrt(this.x * this.x + this.y * this.y); }

    constructor (public x: number = 0, public y: number = 0) {}

    public add (v: Vector) {
        this.x += v.x;
        this.y += v.y;
    }

    public round () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    }

    public multiply (n: number) {
        this.x *= n;
        this.y *= n;
    }

    public clone (): Vector {
        return new Vector(this.x, this.y);
    }
}
