import { ElectronLayer } from './ElectronLayer';
import { elements, IElement } from './elements';

export class Atom {
    public readonly protons: number;
    public readonly electrons: number;

    public readonly number: number;
    public readonly name: string;
    public readonly symbol: string;
    public readonly layers: ElectronLayer[];

    constructor (element: IElement) {
        this.number = element.number;
        this.name = element.name;
        this.symbol = element.symbol;

        this.layers = this.parseConfiguration(element.configuration);

        this.protons = this.number;
        this.electrons = this.number;
    }

    public getElectronsInLayer (n: number): number {
        const sum = this.layers
            .filter((x) => x.number === n)
            .reduce((s, x) => s + x.count, 0);

        return sum;
    }

    private parseConfiguration (configuration: string): ElectronLayer[] {
        const reSymbol = /(\[.+\])/g;
        const reLetter = /[a-zA-Z]/g;

        while (reSymbol.test(configuration)) {
            const match = configuration.match(reSymbol)[0];
            const symbol = match.slice(1, match.length - 1);

            const element = elements.find((x) => x.symbol === symbol);
            configuration = configuration.replace(match, element.configuration);
        }

        const layers: string[] = [];
        let lastLayerStart: number = 0;

        for (let i = 0; i < configuration.length; i++) {
            const char = configuration[i];
            if (reLetter.test(char) && i > 1) {
                layers.push(configuration.slice(lastLayerStart, i - 1));
                lastLayerStart = i - 1;
            }
        }
        layers.push(configuration.slice(lastLayerStart, configuration.length));

        const result = layers.map((x) => new ElectronLayer(x));

        return result;
    }
}
