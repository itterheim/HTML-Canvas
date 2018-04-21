export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.getElementById('image') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight ;
    }

    public run(): void {
        const routine = () => {
            this.clear();
            this.draw();

            window.setTimeout(routine, 500);
        };

        routine();
    }

    public clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private draw () {
        this.drawBranch([0, 0]);
    }

    private getAngle (): number {
        return Math.random() * Math.PI / 2;
    }

    private getLength (): number {
        return 25 + Math.random() * 25;
    }

    private drawBranch (from: number[], i = 0) {
        const a = this.getAngle();
        const l = this.getLength();
        const to = [from[0] + l * Math.cos(a), from[1] + l * Math.sin(a)];

        this.drawLine(from[0], from[1], to[0], to[1]);

        if (i < 40) {
            this.drawBranch(to, i + 1);
            if (Math.random() < 0.15) { this.drawBranch(to, i + 1); }
        }
    }

    private drawPoint (x: number, y: number, r: number = 5) {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000';
        this.ctx.fillStyle = '#900';

        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(x, y, 1, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }

    private drawLine (x1: number, y1: number, x2: number, y2: number) {
        this.ctx.lineWidth = 0.1;
        this.ctx.strokeStyle = '#000';

        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    private getDistance (x1: number, y1: number, x2: number, y2: number): number {
        const a = x2 - x1;
        const b = y2 - y1;

        return Math.sqrt(a * a + b * b);
    }
}
