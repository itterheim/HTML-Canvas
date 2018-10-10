export class Vector {
    constructor (public x: number, public y: number) { }

    public add (vector: Vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
}
