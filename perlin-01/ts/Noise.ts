export class Noise {
    private angles: number[][] = [];

    constructor (private width: number = 100, private height: number = 100) {
        for (let x = 0; x < this.width; x++) {
            const column = [];
            for (let y = 0; y <= this.height; y++) {
                column.push(Math.random() * Math.PI * 2);
            }
            this.angles.push(column);
        }
    }

    public get(x: number = 0, y: number = 0): number {
        const xi = ~~(x % this.width);
        const yi = ~~(y % this.height);
        const xj = (xi + 1) % this.width;
        const yj = (yi + 1) % this.height;

        const fx = x % 1;
        const fy = y % 1;

        const lt = this.angles[xi][yi];
        const rt = this.angles[xj][yi];
        const lb = this.angles[xi][yj];
        const rb = this.angles[xj][yj];

        const dotLt = this.getDotProduct(lt, fx, fy);
        const dotRt = this.getDotProduct(rt, fx - 1, fy);
        const dotLb = this.getDotProduct(lb, fx, fy - 1);
        const dotRb = this.getDotProduct(rb, fx - 1, fy - 1);

        const u = this.fade(fx);
        const v = this.fade(fy);

        const a = this.lerp(dotLt, dotRt, u);
        const b = this.lerp(dotLb, dotRb, u);
        const c = this.lerp(a, b, v);

        return (c + 1) / 2;
    }

    public getOctave (x: number, y: number, octaves: number, persistence: number): number {
        let total: number = 0;
        let frequency: number = 1;
        let amplitude: number = 1;
        let maxValue: number = 0;  // Used for normalizing result to 0.0 - 1.0
        for (let i = 0; i < octaves; i++) {
            total += this.get(x * frequency, y * frequency) * amplitude;

            maxValue += amplitude;

            amplitude *= persistence;
            frequency *= 2;
        }

        return total / maxValue;
    }

    private getDotProduct (angle: number, x: number, y: number): number {
        const vector = this.getCartesian(angle);
        return vector[0] * x + vector[1] * y;
    }

    private getCartesian(angle: number): [number, number] {
        return [
            Math.SQRT2 * Math.cos(angle),
            Math.SQRT2 * Math.sin(angle)
        ];
    }

    private lerp (a: number, b: number, x: number): number {
        return a + x * (b - a);
    }

    private fade (t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }
}
