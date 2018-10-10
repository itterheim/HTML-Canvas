import { RgbColor } from './RgbColor';

export class HsvColor {
    public h: number;
    public s: number;
    public v: number;

    constructor (h: number, s: number, v: number) {
        this.h = h;
        this.s = s;
        this.v = v;
    }

    public getRgb(): RgbColor {
        let r;
        let g;
        let b;

        const i = Math.floor(this.h * 6);
        const f = this.h * 6 - i;
        const p = this.v * (1 - this.s);
        const q = this.v * (1 - f * this.s);
        const t = this.v * (1 - (1 - f) * this.s);

        switch (i % 6) {
            case 0:
                r = this.v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = this.v;
                b = p;
                break;
            case 2:
                r = p;
                g = this.v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = this.v;
                break;
            case 4:
                r = t;
                g = p;
                b = this.v;
                break;
            case 5:
                r = this.v;
                g = p;
                b = q;
                break;
        }

        return new RgbColor(r * 255, g * 255, b * 255);
    }
}
