import { IEmitter } from './IEmitter';

export class NoiseEmitter implements IEmitter {
    public scale: number = 1;

    public getValue (x: number, y: number): number {
        return Math.random() * this.scale;
    }
}
