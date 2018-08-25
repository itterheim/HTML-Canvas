export class TileType {
    constructor (public north: string = null, public east: string = null, public south: string = null, public west: string = null) { }

    public getColor(position: string) {
        if (typeof this[position] !== 'string') { return null; }

        return this[position];
    }
}
