export interface IRectangle {
    x: number;
    y: number;
    w: number;
    h: number;
}

export class Rectangle implements IRectangle {
    constructor (public x: number, public y: number, public w: number, public h: number) {

    }

    public update (): void {
        const add: number = Math.random() * 2 - 1;
        const move: number = add / 2;

        this.x -= move;
        this.y -= move;
        this.w += add;
        this.h += add;
    }

    public getModified (c: number): IRectangle {
        const add: number = c * 20 - 10;
        const move: number = add / 2;

        return {
            h: this.h + add,
            w: this.w + add,
            x: this.x - move,
            y: this.y - move
        };
    }
}
