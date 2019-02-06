export class App {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor () {
        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();

        document.body.insertAdjacentElement('afterbegin', this.canvas);

        this.run();
    }

    public run (): void {
        const render = (time: number) => {
            window.anim = window.requestAnimationFrame((t) => render(t));

            this.ctx.fillRect(
                Math.floor(Math.random() * this.canvas.width),
                Math.floor(Math.random() * this.canvas.height),
                1,
                1
            );
        };

        window.anim = window.requestAnimationFrame((t) => render(t));
    }

    private setCanvasSize () {
        const w = document.body.clientWidth;
        const h = document.body.clientHeight;

        alert(window.devicePixelRatio);

        if (typeof window.devicePixelRatio === 'number') {
            this.canvas.width = w * window.devicePixelRatio;
            this.canvas.height = h * window.devicePixelRatio;
        } else {
            this.canvas.width = w;
            this.canvas.height = h;
        }
    }
}
