
import { HsvColor } from './HsvColor';
import { Point } from './Point';
import { RgbColor } from './RgbColor';

export class Renderer {
    public canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private A: Point; // saturation -> B
    private B: Point; // hue -> C
    private C: Point; // value -> D
    private D: Point;

    private step = 10;

    constructor () {
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        this.A = new Point(100, 100);
        this.B = new Point(100, this.canvas.height - 100);
        this.C = new Point(this.canvas.width - 100, this.canvas.height - 100);
        this.D = new Point(this.canvas.width - 100, 100);
    }

    public render (image: HTMLImageElement, step: number = 10) {
        this.step = step;

        this.reset();

        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        ctx.drawImage(image, 0, 0);

        this.ctx.drawImage(image, this.canvas.width / 2 - 100, 20, 200, canvas.height * 200 / canvas.width);

        this.renderImage(canvas, ctx);
    }

    public reset () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderAxes();
    }

    private renderImage (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        let done: string = '';

        let x = 0;
        const y = 0;

        const loop = () => {
            for (let y = 0; y < canvas.height; y += this.step) {
                const data = ctx.getImageData(x, y, 1, 1).data;
                const color = new RgbColor(data[0], data[1], data[2]);
                const text = `(${color.r},${color.g},${color.b})`;

                if (done.indexOf(text) === -1) {
                    this.renderColor(color);
                    done += text;
                }
            }

            x += this.step;

            if (x < canvas.width) {
                window.animation = window.requestAnimationFrame(() => loop());
            }
        };

        window.animation = window.requestAnimationFrame(() => loop());
    }

    private renderAxes () {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000';

        this.ctx.beginPath();
        this.ctx.arc(this.A.x, this.A.y, 5, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(this.B.x, this.B.y, 5, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(this.C.x, this.C.y, 5, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(this.D.x, this.D.y, 5, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.A.x, this.A.y);
        this.ctx.lineTo(this.B.x, this.B.y);
        this.ctx.lineTo(this.C.x, this.C.y);
        this.ctx.lineTo(this.D.x, this.D.y);
        this.ctx.stroke();
    }

    private renderColor (color: RgbColor) {
        const hsv = color.getHsv();

        const position = this.getPosition(hsv);

        this.ctx.beginPath();
        // this.ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${hsv.s})`;
        this.ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},0.1)`;
        // this.ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        // this.ctx.lineWidth = 0.1;
        this.ctx.arc(position.x, position.y, 6, 0, Math.PI * 2);
        this.ctx.fill();
        // this.ctx.stroke();

    }

    private getPosition (hsv: HsvColor): Point {
        const sum = hsv.h + hsv.s + hsv.v;

        const a = new Point(this.A.x + hsv.s * (this.B.x - this.A.x), this.A.y + hsv.s * (this.B.y - this.A.y));
        const b = new Point(this.B.x + hsv.h * (this.C.x - this.B.x), this.B.y + hsv.h * (this.C.y - this.B.y));
        const c = new Point(this.C.x + hsv.v * (this.D.x - this.C.x), this.C.y + hsv.v * (this.D.y - this.C.y));

        return new Point((hsv.s * a.x + hsv.h * b.x + hsv.v * c.x) / sum, (hsv.s * a.y + hsv.h * b.y + hsv.v * c.y) / sum);

        // const a = new Point(this.A.x + hsv.s * (this.B.x - this.A.x), this.A.y + hsv.s * (this.B.y - this.A.y));
        // const b = new Point(this.B.x + hsv.h * (this.C.x - this.B.x), this.B.y + hsv.h * (this.C.y - this.B.y));
        // const c = new Point(this.C.x + hsv.v * (this.D.x - this.C.x), this.C.y + hsv.v * (this.D.y - this.C.y));

        // return new Point((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);

        // const a = new Point(this.A.x + hsv.s * (this.B.x - this.A.x), this.A.y + hsv.s * (this.B.y - this.A.y));
        // const b = new Point(this.B.x + hsv.h * (this.C.x - this.B.x), this.B.y + hsv.h * (this.C.y - this.B.y));
        // const c = new Point(this.C.x + hsv.v * (this.D.x - this.C.x), this.C.y + hsv.v * (this.D.y - this.C.y));

        // return new Point(b.x, (a.y + c.y) / 2);
    }
}
