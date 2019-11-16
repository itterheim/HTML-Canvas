export class HeightMap {
    private data: number[];
    private layers: number = 10;

    constructor (public readonly width: number, public readonly height: number) {
        this.data = new Array(this.width * this.height)
            .fill(0)
            // .map((_, i) => Math.round((this.layers - 1) * Math.abs(Math.sin(this.indexToXY(i).reduce((s, x) => s * x, 1) / 150))));
            // .map((_, i) => Math.round((this.layers - 1) * (1 + Math.sin(i / 100)) / 2));
            .map(() => Math.floor(Math.random() * this.layers));
        console.log(this.data);
    }

    public render (ctx: CanvasRenderingContext2D, x: number, y: number, tileSize: number) {
        const maps: number[][][] = new Array(this.layers).fill(undefined).map(() => []);

        for (let i = 0; i < this.data.length; i++) {
            const value = this.data[i];
            const xy = this.indexToXY(i);

            for (let v = value; v >= 0; v--) {
                maps[v].push(xy);
            }
        }

        for (let value = 0; value < maps.length; value++) {
            const scale = 1 + value * 0.01;

            const offsetX = (ctx.canvas.width / 2) + (x - (ctx.canvas.width / 2)) * scale;
            const offsetY = (ctx.canvas.height / 2) + (y - (ctx.canvas.height / 2)) * scale;

            ctx.fillStyle = `rgba(0,0,0,${0.5 * value / (this.layers - 1)})`;

            for (const xy of maps[value]) {
                ctx.fillRect(
                    offsetX + xy[0] * tileSize * scale,
                    offsetY + xy[1] * tileSize * scale,
                    tileSize * scale,
                    tileSize * scale);
            }
        }
    }

    private indexToXY (i: number) {
        return [i % this.width, Math.floor(i / this.width)];
    }

    private xyToIndex (x: number, y: number) {
        return y * this.width + x;
    }
}
