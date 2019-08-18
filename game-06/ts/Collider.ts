import { ICollidable } from './ICollidable';
import { IPoint } from './IPoint';
import { TileMap } from './TileMap';

export class Collider {

    constructor (private map: TileMap) { }

    public setMap (map: TileMap) {
        this.map = map;
    }

    public collide (object: ICollidable) {
        this.collidePoint(object, {
            x: object.x,
            y: object.y - object.height / 2
        }, true, false, false, false);

        this.collidePoint(object, {
            x: object.x + object.width / 2,
            y: object.y
        }, false, true, false, false);

        this.collidePoint(object, {
            x: object.x,
            y: object.y + object.height / 2
        }, false, false, true, false);

        this.collidePoint(object, {
            x: object.x - object.width / 2,
            y: object.y
        }, false, false, false, true);
    }

    public collidePoint (object: ICollidable, point: IPoint, top: boolean, right: boolean, bottom: boolean, left: boolean) {
        const tilePosition = {
            x: Math.floor(point.x),
            y: Math.floor(point.y)
        };
        const tile = this.map.getTile(tilePosition);

        if (right && tile) { object.x = tilePosition.x - object.width / 2; }
        if (left && tile) { object.x = tilePosition.x + 1 + object.width / 2; }
        if (top && tile) { object.y = tilePosition.y + 1 + object.height / 2; }
        if (bottom && tile) { object.y = tilePosition.y - object.height / 2; }

    //     if (object.force.x > 0 && right) {
    //         const tilePosition = {
    //             x: Math.floor(point.x + object.force.x),
    //             y: Math.floor(point.y)
    //         };
    //         const tile = this.map.getTile(tilePosition);
    //         if (tile) {
    //             const colliding = this.collideRight(object, point, tilePosition.x);
    //             if (colliding) { return true; }
    //         }
    //     } else if (object.force.x < 0 && left) {
    //         const tilePosition = {
    //             x: Math.floor(point.x + object.force.x),
    //             y: Math.floor(point.y)
    //         };
    //         const tile = this.map.getTile(tilePosition);
    //         if (tile) {
    //             const colliding = this.collideLeft(object, point, tilePosition.x + 1);
    //             if (colliding) { return true; }
    //         }
    //     }

    //     if (object.force.y > 0 && bottom) {
    //         const tilePosition = {
    //             x: Math.floor(point.x),
    //             y: Math.floor(point.y + object.force.y)
    //         };
    //         const tile = this.map.getTile(tilePosition);
    //         if (tile) {
    //             const colliding = this.collideBottom(object, point, tilePosition.y);
    //             if (colliding) { return true; }
    //         }
    //     } else if (object.force.y < 0 && top) {
    //         const tilePosition = {
    //             x: Math.floor(point.x),
    //             y: Math.floor(point.y + object.force.y)
    //         };
    //         const tile = this.map.getTile(tilePosition);
    //         if (tile) {
    //             const colliding = this.collideTop(object, point, tilePosition.y + 1);
    //             if (colliding) { return true; }
    //         }
    //     }

    //     return false;
    }

    // private collideBottom (object: ICollidable, point: IPoint, tileY): boolean {
    //     if (point.y + object.force.y > tileY) {
    //         const diffY = point.y - object.y;
    //         object.y = tileY + (-1 * diffY) - 0.001;
    //         object.force.y = 0;
    //         return true;
    //     }
    //     return false;
    // }

    // private collideTop (object: ICollidable, point: IPoint, tileY): boolean {
    //     if (point.y + object.force.y < tileY) {
    //         const diffY = point.y - object.y;
    //         object.y = tileY + (-1 * diffY) + 0.001;
    //         object.force.y = 0;
    //         return true;
    //     }
    //     return false;
    // }

    // private collideRight (object: ICollidable, point: IPoint, tileX): boolean {
    //     if (point.x + object.force.x > tileX) {
    //         const diffX = point.x - object.x;
    //         object.x = tileX + (-1 * diffX) - 0.001;
    //         object.force.x = 0;
    //         return true;

    //     }
    //     return false;
    // }

    // private collideLeft (object: ICollidable, point: IPoint, tileX): boolean {

    //     if (point.x + object.force.x < tileX) {
    //         const diffX = point.x - object.x;
    //         object.x = tileX + (-1 * diffX) + 0.001;
    //         object.force.x = 0;
    //         return true;

    //     }
    //     return false;

    // }
}
