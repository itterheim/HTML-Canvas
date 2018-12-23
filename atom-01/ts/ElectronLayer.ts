export class ElectronLayer {
    public readonly number: number;
    public readonly type: string;
    public readonly count: number;

    constructor (configuration: string) {
        const reLetter = /[a-zA-Z]/g;
        const values = configuration.split(reLetter);

        this.number = parseInt(values[0], 10);
        this.count = parseInt(values[1], 10);

        this.type = configuration.match(reLetter)[0];
    }
}
