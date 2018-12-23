import { Atom } from './Atom';
import { ElectronLayer } from './ElectronLayer';
import { elements } from './elements';
import { Point } from './Point';

export class Renderer {
    private orbitGap: number = 9;
    private layerGap: number = 4 * this.orbitGap + this.orbitGap;
    private coreOffset: number = this.layerGap / 2;
    private electronRadius: number = this.orbitGap / 3;

    constructor (private readonly ctx: CanvasRenderingContext2D) {}

    public clear () {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.font = '30px sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';
    }

    public drawAtom (atom: Atom) {
        const position = new Point(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);

        this.drawCore(position, atom);
        this.drawLayers(position, atom);

        const layers = Math.max(...atom.layers.map((x) => x.number));
        this.drawSymbol(position, this.coreOffset + this.layerGap * (layers + 1), atom.symbol);
        this.drawName(position, this.coreOffset + this.layerGap * (layers + 1), atom.name);
    }

    private drawCore (position: Point, atom: Atom) {
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(position.x, position.y, 3 + (2 * this.orbitGap - 3) * ((atom.number + 1) / elements.length), 0, 2 * Math.PI, false);
        this.ctx.fill();
    }

    private drawLayers (position: Point, atom: Atom) {
        for (const layer of atom.layers) {
            this.drawLayer(position, layer);
        }
    }

    private drawLayer (position: Point, layer: ElectronLayer) {
        let radius = this.coreOffset + this.layerGap * layer.number;
        let color = '#000';
        let angle = Math.PI;
        let electrons = 1;

        switch (layer.type) {
            case 's':
                electrons = 2;
                angle = 0;
                color = '#c00';
                radius += 0 * this.orbitGap;
                break;
            case 'p':
                electrons = 6;
                angle = 2 * Math.PI / (electrons / 2);
                color = '#0c0';
                radius += 1 * this.orbitGap;
                break;
            case 'd':
                electrons = 10;
                angle = 2 * Math.PI / (electrons / 2);
                color = '#cc0';
                radius += 2 * this.orbitGap;
                break;
            case 'f':
                electrons = 14;
                angle = 2 * Math.PI / (electrons / 2);
                color = '#a0c';
                radius += 3 * this.orbitGap;
                break;
        }

        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
        this.ctx.stroke();

        const l = Math.min(layer.count, electrons / 2);
        for (let i = 0; i < l; i++) {
            let double = false;

            if (i + electrons / 2 < layer.count) {
                double = true;
            }

            this.drawElectron(position, radius, i * angle, color, double);
        }
    }

    private drawElectron (position: Point, radius: number, angle: number, color: string, double: boolean = false) {
        if (double) {
            const a = (2 * Math.PI) * (this.orbitGap / (2 * Math.PI * radius));
            this.drawElectron(position, radius, angle - (a / 2), color);
            this.drawElectron(position, radius, angle + (a / 2), color);
        } else {
            const x = position.x + Math.sin(angle) * radius;
            const y = position.y - Math.cos(angle) * radius;

            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.electronRadius + (double ? 4 : 0), 0, 2 * Math.PI, false);
            this.ctx.fill();
        }
    }

    private drawSymbol (postition: Point, radius: number, symbol: string) {
        this.ctx.fillStyle = '#000';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'bottom';
        this.ctx.font = 'bold 24px serif';
        this.ctx.fillText(symbol, postition.x, postition.y - radius);
    }

    private drawName (postition: Point, radius: number, symbol: string) {
        this.ctx.fillStyle = '#000';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
        this.ctx.font = '14px serif';
        this.ctx.fillText(symbol, postition.x, postition.y - radius + 2);
    }
}
