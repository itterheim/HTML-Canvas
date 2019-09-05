enum Type {
    Down =          0b10000,
    Up =            0b01000,
    Horizontal =    0b00100,
    Left =          0b00010,
    Right =         0b00001
}

export class Maze {
    private data: number[];
    private todo: number[];

    public get done (): boolean { return this.todo.length === 0; }

    constructor (public width: number, public height: number) {
        this.data = new Array(width * height).fill(0).map((x, i) => i % 2 === 1 ? Type.Down : Type.Up);
        this.todo = [Math.floor(Math.random() * this.data.length)];
    }

    public update (mess: number = 1) {
        const index = Math.random() > (1 - mess) ? this.todo.splice(Math.floor(Math.random() * this.todo.length), 1)[0] : this.todo.pop();

        if (index === undefined) { return; }

        const value = this.data[index];
        const neigh = [
            value & Type.Up ? index + this.width : undefined,
            value & Type.Down ? index - this.width : undefined,
            index % this.width > 0 ? index - 1 : undefined,
            index % this.width < this.width - 1 ? index + 1 : undefined
        ].map((x) => x !== undefined && typeof this.data[x] === 'number' ? x : undefined);

        const available = neigh.filter((x) => x !== undefined && (this.data[x] === Type.Down || this.data[x] === Type.Up));

        if (available.length > 1) { this.todo.push(index); }

        if (available.length > 0) {
            const picked = available[Math.floor(Math.random() * available.length)];

            if (index - this.width === picked) {
                // up
                this.data[index] |= Type.Horizontal;
                this.data[picked] |= Type.Horizontal;
            } else if (index + this.width === picked) {
                // down
                this.data[index] |= Type.Horizontal;
                this.data[picked] |= Type.Horizontal;
            } else if (index - 1 === picked) {
                // left
                this.data[index] |= Type.Left;
                this.data[picked] |= Type.Right;
            } else if (index + 1 === picked) {
                // right
                this.data[index] |= Type.Right;
                this.data[picked] |= Type.Left;
            }

            this.todo.push(picked);
        }
    }

    public render (ctx: CanvasRenderingContext2D, tile: number) {
        for (let i = 0; i < this.data.length; i++) {
            const x = i % this.width;
            const y = Math.floor(i / this.width);
            const value = this.data[i];

            this.renderTriangle(ctx, x, y, value, tile);
        }
    }

    private renderTriangle (ctx: CanvasRenderingContext2D, x: number, y: number, value: number, tile: number) {
        const offsetX = Math.floor((ctx.canvas.width - (this.width * (tile / 2))) / 2);
        const offsetY = Math.floor((ctx.canvas.height - (this.height * tile)) / 2);

        const half = tile / 2;

        const centerX = offsetX + x * 0.5 * tile;
        const centerY = offsetY + y * tile;

        if ((value & Type.Up) > 0) {
            if ((value & Type.Left) === 0) {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY - half);
                ctx.lineTo(centerX - half, centerY + half);
                ctx.stroke();
            }
            if ((value & Type.Right) === 0) {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY - half);
                ctx.lineTo(centerX + half, centerY + half);
                ctx.stroke();
            }
            if ((value & Type.Horizontal) === 0) {
                ctx.beginPath();
                ctx.moveTo(centerX + half, centerY + half);
                ctx.lineTo(centerX - half, centerY + half);
                ctx.stroke();
            }
        } else {
            if ((value & Type.Left) === 0) {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY + half);
                ctx.lineTo(centerX - half, centerY - half);
                ctx.stroke();
            }
            if ((value & Type.Right) === 0) {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY + half);
                ctx.lineTo(centerX + half, centerY - half);
                ctx.stroke();
            }
            if ((value & Type.Horizontal) === 0) {
                ctx.beginPath();
                ctx.moveTo(centerX - half, centerY - half);
                ctx.lineTo(centerX + half, centerY - half);
                ctx.stroke();
            }
        }
    }
}
