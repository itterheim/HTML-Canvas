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
                Math.random() * this.canvas.width - 5,
                Math.random() * this.canvas.height - 5,
                10,
                10
            );
        };

        window.anim = window.requestAnimationFrame((t) => render(t));
    }

    private setCanvasSize () {
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
