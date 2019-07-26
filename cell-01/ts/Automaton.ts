export class Automaton {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private data: number[];
    private iterations: number = 1;

    private alive: number[];

    constructor (private rule: number, private size: number = 100, private scale: number = 1) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = `rule-${this.rule}`;
        this.canvas.title = `Rule ${this.rule}`;
        this.canvas.width = this.size * this.scale;
        this.canvas.height = this.size * this.scale;

        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        this.data = new Array(this.size).fill(0).map((_) => Math.round(Math.random()));
        this.alive = rule.toString(2).split('').map((x, i, d) => x === '1' ? d.length - i - 1 : -1).filter((x) => x > -1);
    }

    public async run (): Promise<void> {
        return new Promise((resolve) => {
            const step = () => {
                for (let i = 0; i < 50 && this.iterations < this.size; i++) {
                    this.iterations++;
                    this.update();
                    this.render();
                }
                if (this.iterations < this.size) {
                    window.anim = window.requestAnimationFrame(step);
                } else {
                    resolve();
                }
            };

            if (this.iterations < this.size) {
                this.render();
                step();
            }
        });
    }

    private update () {
        this.data = this.data
            .map((x, i, data) => this.alive.includes(parseInt(this.getSlice(this.data, i, 1).join(''), 2)) ? 1 : 0);
    }

    private render () {
        const y = (this.iterations - 1) * this.scale;
        this.data.forEach((x, i) => {
            this.ctx.fillStyle = x ? '#000' : '#fff';
            this.ctx.fillRect(i * this.scale, y, this.scale, this.scale);
        });
    }

    private sliceWrap (data: number[], from: number, len: number): number[] {
        let result = [];
        if (from < 0) {
            result = result.concat(data.slice(from + data.length, Math.max(data.length, from + data.length + length)));
            len += from;
            from = 0;
        }
        result = result.concat(data.slice(from, from + len));
        if (from + len > data.length) {
            result = result.concat(data.slice(0, from + len - data.length));
        }
        return result;
    }

    private slice (data: number[], position: number, around: number): number[] {
        let from = position - around;
        const to = position + around + 1;
        const len = 2 * around + 1;

        let result = [];
        if (from - around < 0) {
            result = result.concat(new Array(Math.min(0, from + len) - from).fill(0));
            from = 0;
        }
        if (from < to) {
            result = result.concat(data.slice(from, to));
        }
        if (result.length < len) {
             result = result.concat(new Array(len - result.length).fill(0));
        }

        return result;
    }

    private getSlice (data: number[], position: number, around: number): number[] {
        // return this.slice(data, position - around, 2 * around + 1);
        return this.sliceWrap(data, position - around, 2 * around + 1);
    }
}
