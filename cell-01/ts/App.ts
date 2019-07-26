import { Automaton } from './Automaton';

export class App {
    constructor () {
        this.run();
    }

    public async run () {
        for (let i = 0; i < 256; i++) {
            await new Automaton(i, 100, 1).run();
        }
    }
}
