export class Maze {
    private data: number[];
    private todo: number[];

    public get done (): boolean { return this.todo.length === 0; }

    constructor (public width: number, public height: number) {
        this.data = new Array(width * height).fill(0);
        this.todo = [Math.floor(Math.random() * this.data.length)];
    }

    public update (mess: number = 1) {
        const index = Math.random() > (1 - mess) ? this.todo.splice(Math.floor(Math.random() * this.todo.length), 1)[0] : this.todo.pop();
        // const index = Math.random() > (1 - mess) ? this.todo.splice(Math.floor(Math.random() * this.todo.length), 1)[0] : this.todo.shift();

        const neighbors = [
            this.data[index - this.width],
            index % this.width < this.width - 1 ? this.data[index + 1] : undefined,
            this.data[index + this.width],
            index % this.width > 0 ? this.data[index - 1] : undefined
        ];

        const available = neighbors.map((x, i) => (x === 0 ? Math.pow(2, i) : undefined)).filter((x) => Boolean(x));

        if (available.length > 1) { this.todo.push(index); }

        if (available.length > 0) {
            const picked = available[Math.floor(Math.random() * available.length)];
            const nextIndex = this.getNextIndex(index, picked);

            this.data[index] |= picked;
            this.data[nextIndex] |= this.getOpposite(picked);

            this.todo.push(nextIndex);
        }
    }

    public getPath (): string {
        const textual = this.data.map((x) => this.asText(x));

        let result = '\n';
        for (let i = 0; i < textual.length; i += this.width) {
            result += textual.slice(i, i + this.width).join('') + '\n';
        }

        return result;
    }

    public getGrid (): string {
        let x = '';
        for (const cell of this.data) {
            if (cell & 0b0100) {
                x += ' ';
            } else {
                x += '_';
            }

            if (cell & 0b0010) {
                x += ' ';
            } else {
                x += '|';
            }
        }
        return `(${x})`;
    }

    public render (ctx: CanvasRenderingContext2D, tile: number) {
        const offsetX = Math.floor((ctx.canvas.width - (this.width * tile)) / 2);
        const offsetY = Math.floor((ctx.canvas.height - (this.height * tile)) / 2);

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] > 0) {
                const x = i % this.width;
                const y = Math.floor(i / this.width);
                const value = this.data[i];

                ctx.fillStyle = '#fff';
                ctx.fillRect(
                    offsetX + x * tile,
                    offsetY + y * tile,
                    tile,
                    tile
                );

                ctx.fillStyle = '#000';
                if ((value & 0b0001) === 0) {
                    ctx.fillRect(
                        offsetX + x * tile - 1,
                        offsetY + y * tile - 1,
                        tile + 2,
                        2
                    );
                }
                if ((value & 0b0010) === 0) {
                    ctx.fillRect(
                        offsetX + x * tile + tile - 1,
                        offsetY + y * tile - 1,
                        2,
                        tile + 2
                    );
                }
                if ((value & 0b0100) === 0) {
                    ctx.fillRect(
                        offsetX + x * tile - 1,
                        offsetY + y * tile + tile - 1,
                        tile + 2,
                        2
                    );
                }

                if ((value & 0b1000) === 0) {
                    ctx.fillRect(
                        offsetX + x * tile - 1,
                        offsetY + y * tile - 1,
                        2,
                        tile + 2
                    );
                }
            }
        }

        // ctx.fillStyle = '#f00';
        // ctx.fillText(this.todo.length.toString(), 10, 10);
    }

    private getNextIndex (index: number, direction: number): number {
        if (direction === 0b0001) { return index - this.width; }
        if (direction === 0b0010) { return index + 1; }
        if (direction === 0b0100) { return index + this.width; }
        if (direction === 0b1000) { return index - 1; }
        return undefined;
    }

    private getOpposite (direction: number): number {
        if (direction === 0b0001) { return 0b0100; }
        if (direction === 0b0100) { return 0b0001; }
        if (direction === 0b0010) { return 0b1000; }
        if (direction === 0b1000) { return 0b0010; }
        return 0;
    }

    private asText (direction: number): string {
        if (direction === 0b0000) { return 'O'; }
        if (direction === 0b0001) { return '^'; }
        if (direction === 0b0010) { return '>'; }
        if (direction === 0b0100) { return 'v'; }
        if (direction === 0b1000) { return '<'; }
        if (direction === 0b0011) { return '└'; }
        if (direction === 0b0110) { return '┌'; }
        if (direction === 0b1100) { return '┐'; }
        if (direction === 0b1001) { return '┘'; }
        if (direction === 0b1010) { return '─'; }
        if (direction === 0b0101) { return '│'; }
        if (direction === 0b1110) { return '┬'; }
        if (direction === 0b0111) { return '├'; }
        if (direction === 0b1011) { return '┴'; }
        if (direction === 0b1101) { return '┤'; }
        if (direction === 0b1111) { return '┼'; }

        return '';
    }
}
