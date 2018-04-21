export class Point {
    public x: number;
    public y: number;

    public ax: number;
    public ay: number;

    constructor (private w: number, private h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;

        this.ax = 1 - Math.random() * 2;
        this.ay = 0.5 - Math.random() * 1;
    }

    public update () {
        this.x += this.ax;
        this.y += this.ay;

        if (this.x > this.w) { this.x -= this.w; }
        if (this.x < 0) { this.x += this.w; }
        if (this.y > this.h) { this.y -= this.h; }
        if (this.y < 0) { this.y += this.h; }
    }
}
