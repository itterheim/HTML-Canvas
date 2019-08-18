import { IPoint } from './IPoint';
import { Vector } from './Vector';

export interface ICollidable extends IPoint {
    width: number;
    height: number;
    force: Vector;
}
