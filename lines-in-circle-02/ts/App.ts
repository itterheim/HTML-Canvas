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

            window.setTimeout(routine, 1000);
        };

        routine();
    }

    public clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private draw () {
        const r = 400;
        const center = { x: Math.round(this.canvas.width / 2), y: Math.round(this.canvas.height / 2) };

        const exceptions = [
            { x: center.x + r - Math.random() * 2 * r, y: center.y + r - Math.random() * 2 * r, r: 200 },
            { x: center.x + r - Math.random() * 2 * r, y: center.y + r - Math.random() * 2 * r, r: 100 },
            { x: center.x + r - Math.random() * 2 * r, y: center.y + r - Math.random() * 2 * r, r: 50 },
            { x: center.x + r - Math.random() * 2 * r, y: center.y + r - Math.random() * 2 * r, r: 50 }
        ];

        for (let i = 0; i < 5000; i++) {
            let angle = Math.random() * Math.PI * 2;

            const sC = Math.round(Math.random() * exceptions.length);
            const eC = Math.round(Math.random() * exceptions.length);

            const sCx = sC === exceptions.length ? center.x : exceptions[sC].x;
            const sCy = sC === exceptions.length ? center.y : exceptions[sC].y;
            const sCr = sC === exceptions.length ? r : exceptions[sC].r;
            const eCx = eC === exceptions.length ? center.x : exceptions[eC].x;
            const eCy = eC === exceptions.length ? center.y : exceptions[eC].y;
            const eCr = eC === exceptions.length ? r : exceptions[eC].r;

            const start = { x: sCx + sCr * Math.cos(angle), y: sCy + sCr * Math.sin(angle) };
            angle = Math.random() * Math.PI * 2;
            const end = { x: eCx + eCr * Math.cos(angle), y: eCy + eCr * Math.sin(angle) };

            let intersect = false;

            for (const exception of exceptions) {
                const a = this.getDistance(start.x, start.y, end.x, end.y);
                const b = this.getDistance(start.x, start.y, exception.x, exception.y);
                const c = this.getDistance(end.x, end.y, exception.x, exception.y);

                angle = Math.acos((a * a + b * b - c * c) / (2 * a * b));
                const dist = Math.sin(angle) * b;

                if (dist < exception.r - 0.1) {
                    intersect = true;
                    continue;
                }

            }
            if (intersect) {
                i--;
                continue;
            }

            this.drawLine(start.x, start.y, end.x, end.y);
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
