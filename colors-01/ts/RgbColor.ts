import { HsvColor } from './HsvColor';

export class RgbColor {
    public r: number;
    public g: number;
    public b: number;

    constructor (r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public getHsv(): HsvColor {
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h;
        let s;
        const v = max;

        const d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return new HsvColor(h, s, v);
    }
}
