type Point = [number, number];
type Line = [Point, Point];

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private boundaries: Line[] = [];
    private intersections: Array<{ point: Point, lines: Line[] }> = [];

    constructor() {
        this.canvas = document.getElementById('image') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight ;
    }

    public run(): void {
        console.clear();

        const count = 5000;
        const angle = Math.PI / 2 / count;
        let n = 1000;
        const routine = () => {
            this.clear();
            this.reset();

            this.ctx.lineWidth = 0.5;
            this.ctx.strokeStyle = '#000';
            this.draw(this.intersections[0].point, n * angle);

            n = n >= count ? 0 : n + 1;
            window.requestAnimationFrame(routine);
            // window.setTimeout(routine, 500);
        };

        window.requestAnimationFrame(routine);
    }

    public clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private reset () {
        this.boundaries = [];
        this.intersections = [];

        const lt: Point = [0, 0];
        const rt: Point = [this.canvas.width, 0];
        const rb: Point = [this.canvas.width, this.canvas.height];
        const lb: Point = [0, this.canvas.height];

        this.intersections.push({ point: lt, lines: [[lt, rt], [lt, lb]]});
        this.intersections.push({ point: rt, lines: [[rt, rb], [rt, lt]]});
        this.intersections.push({ point: rb, lines: [[rb, rt], [rb, lb]]});
        this.intersections.push({ point: lb, lines: [[lb, lt], [lb, rb]]});

        this.boundaries.push([lt, rt]);
        this.boundaries.push([rt, rb]);
        this.boundaries.push([lb, rb]);
        this.boundaries.push([lt, lb]);
    }

    private draw (point: Point = [0, 0], angle: number = (Math.PI / 2) * Math.random(), crossSelf: boolean = false) {
        const maxLength = Math.sqrt(this.canvas.width * this.canvas.width + this.canvas.height * this.canvas.height);
        const minLength = this.ctx.lineWidth * 2;
        const lines: Line[] = [];

        for (let i = 0; i < 1000; i++) {
            const length = maxLength;
            const target = [point[0] + length * Math.cos(angle), point[1] + length * Math.sin(angle)];

            const int = this.boundaries.map((line, index) => {
                const intersection = this.getLineIntersection(point[0], point[1], target[0], target[1], line[0][0], line[0][1], line[1][0], line[1][1]);
                let distance = intersection !== null ? this.getDistance(point[0], point[1], intersection[0], intersection[1]) : 0;
                distance = Math.round(distance * 10) / 10;
                if (intersection === null || distance <= 0) { return null; }
                return { intersection, distance, line };
            }).filter((x) => x !== null).sort((a, b) => a.distance > b.distance ? 1 : -1)[0];

            // exit condition
            if (!int || this.getDistance(point[0], point[1], int.intersection[0], int.intersection[1]) <= minLength) {
                break;
            }

            lines.push([point, int.intersection]);
            if (!crossSelf) { this.boundaries.push(lines[lines.length - 1]); }
            this.intersections.push({ point: int.intersection, lines: [[int.intersection, point], [int.intersection, int.line[0]]]});

            const angleFix = this.getLineAngle(int.line);
            const lineAngle = this.getLineAngle([point, target] as Line);

            let fixedLineAngle = lineAngle - angleFix;

            while (fixedLineAngle > Math.PI) { fixedLineAngle -= Math.PI * 2; }
            while (fixedLineAngle < - Math.PI) { fixedLineAngle += Math.PI * 2; }

            angle = -fixedLineAngle + angleFix;
            point = int.intersection;
        }

        if (crossSelf) { this.boundaries = this.boundaries.concat(lines); }
        this.drawLines(lines);
    }

    private drawPoint (point: Point, r: number = 5) {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000';
        this.ctx.fillStyle = '#900';

        this.ctx.beginPath();
        this.ctx.arc(point[0], point[1], r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(point[0], point[1], 1, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }

    private drawLines(lines: Line[]) {
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        for (const line of lines) {
            this.ctx.moveTo(line[0][0], line[0][1]);
            this.ctx.lineTo(line[1][0], line[1][1]);
        }
        this.ctx.stroke();
    }

    private drawLine (from: Point, to: Point) {
        this.ctx.lineCap = 'round';

        this.ctx.beginPath();
        this.ctx.moveTo(from[0], from[1]);
        this.ctx.lineTo(to[0], to[1]);
        this.ctx.stroke();
    }

    private getDistance (x1: number, y1: number, x2: number, y2: number): number {
        const a = x2 - x1;
        const b = y2 - y1;

        return Math.sqrt(a * a + b * b);
    }

    private getLineIntersection(p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number, p3x: number, p3y: number): Point {
        const s1x = p1x - p0x;
        const s1y = p1y - p0y;
        const s2x = p3x - p2x;
        const s2y = p3y - p2y;

        let ix: number;
        let iy: number;

        const s = (-s1y * (p0x - p2x) + s1x * (p0y - p2y)) / (-s2x * s1y + s1x * s2y);
        const t = (s2x * (p0y - p2y) - s2y * (p0x - p2x)) / (-s2x * s1y + s1x * s2y);

        if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
            ix = p0x + (t * s1x);
            iy = p0y + (t * s1y);
            return [ix, iy];
        }

        return null;
    }

    private getAngle (p1: Point, p2: Point, p3: Point): number {
        const d12 = this.getDistance(p1[0], p1[1], p2[0], p2[1]);
        const d13 = this.getDistance(p1[0], p1[1], p3[0], p2[1]);
        const d23 = this.getDistance(p2[0], p2[1], p3[0], p2[1]);

        return Math.acos((Math.pow(d23, 2) + Math.pow(d12, 2) - Math.pow(d13, 2)) / (2 * d23 * d12));
    }

    // private getAngle (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number {
    //     const d12 = this.getDistance(x1, y1, x2, y2);
    //     const d13 = this.getDistance(x1, y1, x3, y3);
    //     const d23 = this.getDistance(x2, y2, x3, y3);
    //     return Math.acos((Math.pow(d23, 2) + Math.pow(d12, 2) - Math.pow(d13, 2)) / (2 * d23 * d12));
    // }

    private getLineAngle (line: Line): number {
        const angle = Math.atan((line[1][1] - line[0][1]) / (line[1][0] - line[0][0]));

        if (line[1][0] - line[0][0] < 0) {
            return angle + Math.PI;
        } else if ((line[1][0] - line[0][0]) > 0 && (line[1][1] - line[0][1]) < 0) {
            return angle + Math.PI * 2;
        } else {
            return angle;
        }
    }
}
