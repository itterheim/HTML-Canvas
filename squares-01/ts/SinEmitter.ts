import { IEmitter } from './IEmitter';

export class SinEmitter implements IEmitter {
    constructor (private x: number, private y: number, public scale: number) {}

    public getValue (x: number, y: number): number {
        return (Math.sin(this.scale * Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2))) + 1) / 2;
    }
}
