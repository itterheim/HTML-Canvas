export class Point {
    constructor (public x: number, public y: number) {}

    public clone (): Point {
        return new Point(this.x, this.y);
    }
}
