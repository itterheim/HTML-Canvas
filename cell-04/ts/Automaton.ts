export class Automaton {
    public data: number[] = [];

    constructor (private width: number, private height: number) {
        this.data = new Array(this.width * this.height).fill(0);
    }

    public update () {
        // apply rules and update data;
        this.data = this.data.map((x, i, d) => {
            let top = i - this.width;
            if (top < 0) { top += this.data.length; }
            let bottom = i + this.width;
            if (bottom >= this.data.length) { bottom -= this.data.length; }

            let left = i - 1;
            if (i % this.width === 0) { left += this.width - 1; }

            let right = i + 1;
            if (right % this.width === 0) { right -= this.width; }

            const neighbors = [
                d[top],
                d[right],
                d[bottom],
                d[left]
            ];
            const sum = neighbors.reduce((s, v) => s + v, 0);

            if (sum > 50 && x < 20) {
                return x + 2.5;
            } else if (sum > 0 && x < 20) {
                return x + 0.5;
            } else {
                return 0;
            }
        });
    }

    public setXY (value: number, x: number, y: number) {
        const index = y * this.width + x;
        this.data[index] = value;
    }

    public setRandom (limit: number = 0.5) {
        this.data = this.data.map((_) => Math.random() > limit ? 1 : 0);
    }
}
