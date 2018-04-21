export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private cellSize = 50;
    private padding: { v: number, h: number };
    private transformations: { [key: string]: (xIndex: number, yIndex: number) => number} = {};

    constructor() {
        console.clear();
        this.canvas = document.getElementById('image') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.padding = {
            h: Math.floor((this.canvas.width % this.cellSize) / 2),
            v: Math.floor((this.canvas.height % this.cellSize) / 2)
        };

        const maxXIndex = Math.floor(this.canvas.width / this.cellSize) - 1;
        const maxYIndex = Math.floor(this.canvas.height / this.cellSize) - 1;
        const maxLength = Math.sqrt(maxXIndex * maxXIndex + maxYIndex * maxYIndex);

        this.transformations.cross = (xIndex, yIndex) => {
            const length = 0.01 + Math.sqrt(xIndex * xIndex + yIndex * yIndex);
            return Math.min(length / maxLength, 1);
        };

        this.transformations.circle = (xIndex, yIndex) => {
            xIndex = maxXIndex - xIndex;
            const length = 0.01 + Math.sqrt(xIndex * xIndex + yIndex * yIndex);
            return Math.min(length * 1.25 / maxLength, 1);
        };

        this.run();
    }

    public run(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let xIndex = 0; xIndex * this.cellSize <= this.canvas.width - this.cellSize; xIndex++) {
            for (let yIndex = 0; yIndex * this.cellSize <= this.canvas.height - this.cellSize; yIndex++) {
                this.drawCell(xIndex, yIndex);
            }
        }
    }

    private drawCell(xIndex: number, yIndex: number): void {
        const x = xIndex * this.cellSize + this.padding.h;
        const y = yIndex * this.cellSize + this.padding.v;

        this.circleRenderer(x, y, this.transformations.circle(xIndex, yIndex));
        this.crossRenderer(x, y, this.transformations.cross(xIndex, yIndex));
    }

    private crossRenderer(x: number, y: number, progress: number = 1) {
        this.ctx.lineWidth = 2 + progress * 3;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = `rgba(0,0,0,${((Math.sin(progress * Math.PI * 1.5) + 1) / 2) * 0.4}`;

        const padding = 3 + progress * 10;

        this.ctx.beginPath();
        this.ctx.moveTo(x + padding, y + padding);
        this.ctx.lineTo(x + this.cellSize - padding, y + this.cellSize - padding);
        this.ctx.moveTo(x + this.cellSize - padding, y + padding);
        this.ctx.lineTo(x + padding, y + this.cellSize - padding);
        this.ctx.stroke();
    }

    private circleRenderer(x: number, y: number, progress: number = 1) {
        this.ctx.lineWidth = 2 + (1 - progress) * 4;
        this.ctx.strokeStyle = `rgba(0,70,200,${0 + ((Math.sin(progress * Math.PI * 1.5) + 1) / 2) * 0.6}`;

        const r = 0.5 * this.cellSize / 2 + progress * 0.4 * this.cellSize / 2;

        this.ctx.beginPath();
        const start = progress * Math.PI;
        this.ctx.arc(x + this.cellSize / 2, y + this.cellSize / 2, r, start, start + 0.4 + progress * (Math.PI - 0.4));
        this.ctx.stroke();
    }
}
