declare global {
    interface Window {
        anim: number;
        timeout: number;
        interval: number;
    }
}

export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor () {
        const old = document.querySelector('canvas');
        if (old) { old.parentNode.removeChild(old); }

        window.cancelAnimationFrame(window.anim);
        window.clearInterval(window.interval);
        window.clearTimeout(window.timeout);

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.insertAdjacentElement('afterbegin', this.canvas);

        const start = () => {
            window.cancelAnimationFrame(window.anim);
            this.resize();
            this.run();
        };

        window.onresize = start;
        document.onkeypress = start;
        this.canvas.onclick = start;

        this.resize();
        this.run();
    }

    private run () {
        console.clear();

        this.ctx.fillStyle = '#35002f';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const exp = Math.floor(Math.log(Math.min(this.canvas.height, this.canvas.width)) / Math.log(2));
        const size = Math.pow(2, exp) + 1;

        const left = Math.floor((this.canvas.width - size) / 2);
        const top = Math.floor((this.canvas.height - size) / 2);

        const map: number[][] = new Array(size).fill(undefined).map((x) => new Array(size).fill(undefined));
        map[0][0] = Math.random();
        map[0][size - 1] = Math.random();
        map[size - 1][0] = Math.random();
        map[size - 1][size - 1] = Math.random();

        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(left, top, size, size);

        this.renderCell(left + 0, top + 0, map[0][0]);
        this.renderCell(left + 0, top + size - 1, map[0][size - 1]);
        this.renderCell(left + size - 1, top + 0, map[size - 1][0]);
        this.renderCell(left + size - 1, top + size - 1, map[size - 1][size - 1]);

        let distance = size - 1;
        const step = (time: number) => {
            if (distance > 1) {
                for (let i = 0; i < size - 1; i += distance) {
                    for (let j = 0; j < size - 1; j += distance) {
                        let sum =
                            map[i][j] +
                            map[i + distance][j] +
                            map[i][j + distance] +
                            map[i + distance][j + distance];
                        let avg = sum / 4;
                        avg += 0.05 - Math.random() / 10;
                        map[i + distance / 2][j + distance / 2] = avg;
                        this.renderCell(left + i + distance / 2, top + j + distance / 2, avg);

                        sum =
                            map[i][j] +
                            map[i + distance][j] +
                            map[i + distance / 2][j + distance / 2];
                        avg = sum / 3;
                        avg += 0.05 - Math.random() / 10;
                        map[i + distance / 2][j] = avg;
                        this.renderCell(left + i + distance / 2, top + j, map[i + distance / 2][j]);

                        sum =
                            map[i + distance][j] +
                            map[i + distance][j + distance] +
                            map[i + distance / 2][j + distance / 2];
                        avg = sum / 3;
                        avg += 0.05 - Math.random() / 10;
                        map[i + distance][j + distance / 2] = avg;
                        this.renderCell(left + i + distance, top + j + distance / 2, map[i + distance][j + distance / 2]);

                        sum =
                            map[i][j + distance] +
                            map[i + distance][j + distance] +
                            map[i + distance / 2][j + distance / 2];
                        avg = sum / 3;
                        avg += 0.05 - Math.random() / 10;
                        map[i + distance / 2][j + distance] = avg;
                        this.renderCell(left + i + distance / 2, top + j + distance, map[i + distance / 2][j + distance]);

                        sum =
                            map[i][j] +
                            map[i][j + distance] +
                            map[i + distance / 2][j + distance / 2];
                        avg = sum / 3;
                        avg += 0.05 - Math.random() / 10;
                        map[i][j + distance / 2] = avg;
                        this.renderCell(left + i, top + j + distance / 2, map[i][j + distance / 2]);
                    }
                }

                distance /= 2;
                window.anim = window.requestAnimationFrame((t) => step(t));
            }
        };

        window.anim = window.requestAnimationFrame((t) => step(t));
    }

    private renderCell (x: number, y: number, shade: number) {
        const c = Math.round(shade * 255);
        this.ctx.fillStyle = `rgb(${c},${c},${c})`;
        this.ctx.fillRect(x, y, 1, 1);
    }

    private clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private resize () {
        const w = document.body.clientWidth;
        const h = document.body.clientHeight;

        if (typeof window.devicePixelRatio === 'number') {
            this.canvas.width = w * window.devicePixelRatio;
            this.canvas.height = h * window.devicePixelRatio;
        } else {
            this.canvas.width = w;
            this.canvas.height = h;
        }
    }
}
