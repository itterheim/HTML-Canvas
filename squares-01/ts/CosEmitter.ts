import { IEmitter } from './IEmitter';

export class CosEmitter implements IEmitter {
    constructor (private x: number, private y: number, public scale: number) {}

    public getValue (x: number, y: number): number {
        return (Math.cos(this.scale * Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2))) + 1) / 2;
    }
}
