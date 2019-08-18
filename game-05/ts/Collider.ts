import { ICollidable } from './ICollidable';
import { IPoint } from './IPoint';
import { TileMap } from './TileMap';

export class Collider {

    constructor (private map: TileMap) { }

    public setMap (map: TileMap) {
        this.map = map;
    }

    public collide (object) {
        let colliding = false;

        colliding = this.collidePoint(object, {
            x: object.x - object.width / 2,
            y: object.y - object.height / 2
        }, true, false, false, true);
        // if (colliding) { return; }

        colliding = this.collidePoint(object, {
            x: object.x + object.width / 2,
            y: object.y - object.height / 2
        }, true, true, false, false);
        // if (colliding) { return; }

        colliding = this.collidePoint(object, {
            x: object.x - object.width / 2,
            y: object.y + object.height / 2
        }, false, false, true, true);
        // if (colliding) { return; }

        colliding = this.collidePoint(object, {
            x: object.x + object.width / 2,
            y: object.y + object.height / 2
        }, false, true, true, false);
        // if (colliding) { return; }
    }

    public collidePoint (object: ICollidable, point: IPoint, top: boolean, right: boolean, bottom: boolean, left: boolean): boolean {
        if (object.force.x > 0 && right) {
            const tilePosition = {
                x: Math.floor(point.x + object.force.x),
                y: Math.floor(point.y)
            };
            const tile = this.map.getTile(tilePosition);
            if (tile) {
                const colliding = this.collideRight(object, point, tilePosition.x);
                if (colliding) { return true; }
            }
        } else if (object.force.x < 0 && left) {
            const tilePosition = {
                x: Math.floor(point.x + object.force.x),
                y: Math.floor(point.y)
            };
            const tile = this.map.getTile(tilePosition);
            if (tile) {
                const colliding = this.collideLeft(object, point, tilePosition.x + 1);
                if (colliding) { return true; }
            }
        }

        if (object.force.y > 0 && bottom) {
            const tilePosition = {
                x: Math.floor(point.x),
                y: Math.floor(point.y + object.force.y)
            };
            const tile = this.map.getTile(tilePosition);
            if (tile) {
                const colliding = this.collideBottom(object, point, tilePosition.y);
                if (colliding) { return true; }
            }
        } else if (object.force.y < 0 && top) {
            const tilePosition = {
                x: Math.floor(point.x),
                y: Math.floor(point.y + object.force.y)
            };
            const tile = this.map.getTile(tilePosition);
            if (tile) {
                const colliding = this.collideTop(object, point, tilePosition.y + 1);
                if (colliding) { return true; }
            }
        }

        return false;
    }

    private collideBottom (object: ICollidable, point: IPoint, tileY): boolean {
        if (point.y + object.force.y > tileY) {
            const diffY = point.y - object.y;
            object.y = tileY + (-1 * diffY) - 0.001;
            object.force.y = 0;
            return true;
        }
        return false;
    }

    private collideTop (object: ICollidable, point: IPoint, tileY): boolean {
        if (point.y + object.force.y < tileY) {
            const diffY = point.y - object.y;
            object.y = tileY + (-1 * diffY) + 0.001;
            object.force.y = 0;
            return true;
        }
        return false;
    }

    private collideRight (object: ICollidable, point: IPoint, tileX): boolean {
        if (point.x + object.force.x > tileX) {
            const diffX = point.x - object.x;
            object.x = tileX + (-1 * diffX) - 0.001;
            object.force.x = 0;
            return true;

        }
        return false;
    }

    private collideLeft (object: ICollidable, point: IPoint, tileX): boolean {

        if (point.x + object.force.x < tileX) {
            const diffX = point.x - object.x;
            object.x = tileX + (-1 * diffX) + 0.001;
            object.force.x = 0;
            return true;

        }
        return false;

    }

    // public collide (object: ICollidable) {

    //     // if (object.force.x < 0 || object.force.y < 0) {
    //     //     const topLeft = { x: object.x - object.width / 2, y: object.y - object.height / 2 };
    //     //     this.collidePoint(object, topLeft);
    //     // }
    //     if (object.force.x > 0 || object.force.y < 0) {
    //         const topRight = { x: object.x + object.width / 2, y: object.y - object.height / 2 - 0.0001 };
    //         this.collidePoint(object, topRight);
    //     }
    //     // if (object.force.x < 0 || object.force.y > 0) {
    //     //     const bottomLeft = { x: object.x - object.width / 2, y: object.y + object.height / 2 - 0.0001 };
    //     //     this.collidePoint(object, bottomLeft);
    //     // }
    //     // if (object.force.x > 0 || object.force.y > 0) {
    //     //     const bottomRight = { x: object.x + object.width / 2, y: object.y + object.height / 2 - 0.0001 };
    //     //     this.collidePoint(object, bottomRight);
    //     // }
    // }

    // private collidePoint (object: ICollidable, point: IPoint) {
    //     // const tileX = Math.floor(point.x + object.force.x);
    //     // const tileY = Math.floor(point.y + object.force.y);
    //     // const tile = this.map.getTile({ x: tileX, y: tileY });

    //     // console.log(tile, tileX, tileY);
    //     const tileVX = Math.floor(point.x);
    //     const tileVY = Math.floor(point.y + object.force.y);
    //     const tileV = this.map.getTile({ x: tileVX, y: tileVY });

    //     const tileHX = Math.floor(point.x + object.force.x);
    //     const tileHY = Math.floor(point.y - 0.0001);
    //     const tileH = this.map.getTile({ x: tileHX, y: tileHY });

    //     // console.log(tileH, tileHX, tileHY);

    //     // console.log(tile, tileX, tileY);

    //     // this.map.ti
    //     // console.log(tile, tileY * 5 + tileX);

    //     // console.log(tile, tileY);
    //     if (tileV) {
    //         if (object.force.y < 0) { this.collideTop(object, point, tileVY + 1); }
    //         if (object.force.y > 0) { this.collideBottom(object, point, tileVY); }
    //     }
    //     if (tileH) {
    //         if (object.force.x < 0) { this.collideLeft(object, point, tileHX + 1); }
    //         if (object.force.x > 0) { this.collideRight(object, point, tileHX); }
    //     }
    // }

    // private collideLeft (object: ICollidable, point: IPoint, tileX: number) {
    //     const diffX = object.x - point.x;
    //     const x = point.x + object.force.x;
    //     if (x < tileX) {
    //         object.force.x = 0;
    //         console.log(diffX);
    //         object.x = tileX + diffX;
    //     }
    // }

    // private collideRight (object: ICollidable, point: IPoint, tileX: number) {
    //     const diffX = object.x - point.x;
    //     const x = point.x + object.force.x;
    //     if (x > tileX) {
    //         object.force.x = 0;
    //         object.x = tileX + diffX;
    //     }
    // }

    // private collideTop (object: ICollidable, point: IPoint, tileY: number) {
    //     const diffY = object.y - point.y;
    //     const y = point.y + object.force.y;
    //     if (y < tileY) {
    //         object.force.y = 0;
    //         object.y = tileY + diffY;
    //     }
    // }

    // private collideBottom (object: ICollidable, point: IPoint, tileY: number) {
    //     const diffY = object.y - point.y;
    //     const y = point.y + object.force.y;
    //     if (y > tileY) {
    //         object.force.y = 0;
    //         object.y = tileY + diffY;
    //     }
    // }
}
