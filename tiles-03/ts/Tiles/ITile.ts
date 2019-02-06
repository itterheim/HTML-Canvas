export interface ITile {
    x: number;
    y: number;
    size: number;
    type: string;
    render: (ctx: CanvasRenderingContext2D) => void;
}
