export class Vector {
    public get magnitude (): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public get direction (): number {
        return Math.atan2(this.y, this.x);
    }

    constructor (public x: number = 0, public y: number = 0) { }

    public add (vector: Vector): this {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    public subtract (vector: Vector): this {
        this.add(vector.clone().multiply(-1));
        return this;
    }

    public multiply (n: number): this {
        this.x *= n;
        this.y *= n;
        return this;
    }

    public divide (n: number): this {
        return this.multiply(1 / n);
    }

    public normalize (): this {
        this.multiply(1 / this.magnitude);
        return this;
    }

    public clone (): Vector {
        return new Vector(this.x, this.y);
    }

    public getDistance (vector: Vector): number {
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
