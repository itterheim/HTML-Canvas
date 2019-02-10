import { Circle } from './Circle';

export class Worm {
    private circles: Circle[] = [];
    private target: { x: number, y: number, a: number };
    private color: string;
    private gap: number;

    constructor (private area: {width: number, height: number}, private limit = 11, private speed = 1) {
        if (this.limit % 2 === 0) { this.limit++; }

        this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        this.gap = 1 + Math.random() * 5;

        for (let i = 0; i < this.limit; i++) {
            this.addCircle();
        }

        this.udpateTarget();
    }

    public addCircle () {
        let x = 0;
        let y = 0;
        let a: number = null;

        if (this.circles.length === 0) {
            x = Math.random() * this.area.width;
            y = Math.random() * this.area.height;
        } else {
            const last = this.circles[this.circles.length - 1];
            const r = this.gap;

            a = last.a + Math.random() * (Math.PI / 2) - (Math.PI / 4);
            x = last.x + r * Math.cos(a);
            y = last.y + r * Math.sin(a);

            x = x > this.area.width ? x - this.area.width : x;
            x = x < 0 ? x + this.area.width : x;
            y = y > this.area.height ? y - this.area.height : y;
            y = y < 0 ? y + this.area.height : y;
        }

        this.circles.push(new Circle(x, y, 10, a));

        if (this.circles.length > this.limit) { this.circles.shift(); }
        this.updateRadius();
    }

    public step () {
        for (let i = this.circles.length - 1; i >= 0; i--) {
            const current = this.circles[i];
            const previous = this.circles[i - 1];

            if (i === this.circles.length - 1) {
                let x = this.target.x - current.x;
                let y = this.target.y - current.y;
                const mag = Math.sqrt(x * x + y * y);
                x = x * this.speed / mag;
                y = y * this.speed / mag;

                current.x += x;
                current.y += y;
            }

            if (previous) {
                let x = previous.x - current.x;
                let y = previous.y - current.y;

                const mag = Math.sqrt(x * x + y * y);
                x = x * this.gap / mag;
                y = y * this.gap / mag;

                previous.x = current.x + x;
                previous.y = current.y + y;

                current.a = Math.atan((current.y - previous.y) / (current.x - previous.x));
            }
        }

        this.udpateTarget();
    }

    public render (ctx: CanvasRenderingContext2D, t: number) {
        let color = true;
        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i];

            if (color) {
                ctx.fillStyle = this.color;
            } else {
                ctx.fillStyle = '#fff';
            }

            const r = 3 * circle.r / 4 + (circle.r / 4) * ((1 + Math.sin(t / (this.speed * 100) + i / 2)) / 2);

            ctx.beginPath();
            ctx.arc(circle.x, circle.y, r, 0, 2 * Math.PI, false);
            ctx.fill();

            color = !color;
        }
    }

    private updateRadius () {
        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i];
            const ratio = (Math.sin(Math.PI * i / (this.circles.length - 1)));
            circle.r = 5 + Math.min(this.circles.length / 5, 20) * ratio;
        }
    }

    private udpateTarget () {
        const head = this.circles[this.circles.length - 1];
        let distance = 0;

        if (head && this.target) {
            const x = this.target.x - head.x;
            const y = this.target.y - head.y;
            distance = Math.sqrt(x * x + y * y);
        }

        if (distance < 20) {
            this.target = { x: Math.random() * this.area.width, y: Math.random() * this.area.height, a: 0};
        }
    }
}
