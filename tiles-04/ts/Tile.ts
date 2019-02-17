export class Tile {
    constructor (private x: number, private y: number, private size: number) {}

    public render (ctx: CanvasRenderingContext2D, mouse: {x: number, y: number} = null) {
        const dx = mouse.x - (this.x + this.size / 2);
        const dy = mouse.y - (this.y + this.size / 2);
        const n = 7;

        for (let i = 0; i < n; i++) {
            const ratio = 1 - 0.9 * i / n;
            this.renderCircle(ctx, i, ratio, dx, dy);
        }
    }

    private renderCircle (ctx: CanvasRenderingContext2D, i: number, ratio: number, dx: number, dy: number) {
        const m = Math.sqrt(ctx.canvas.width * ctx.canvas.width + ctx.canvas.height * ctx.canvas.height);
        const n = Math.min(Math.sqrt(dx * dx + dy * dy), m) / m;
        const radius = ratio * this.size / 2;

        const limit = (this.size / 2 - radius) * 1.2    ;

        const x = this.x + this.size / 2 + Math.max(Math.min(n * (1 - ratio) * dx, limit), -1 * limit);
        const y = this.y + this.size / 2 + Math.max(Math.min(n * (1 - ratio) * dy, limit), -1 * limit);

        ctx.lineWidth = 0.1 + (1.01 - ratio);

        if (i % 2 === 0) {
            ctx.fillStyle = '#fff';
        } else {
            ctx.fillStyle = '#000';
        }

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}
