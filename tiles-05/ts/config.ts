export class Config {
    public probabilities = [0, 1, 2, 4, 8];

    private element: HTMLDivElement;

    constructor (private scale: number, private callback: (scale: number, probabilities: number[]) => void) {
        const html = `
            <div id="config">
                <label for="scale">scale (<span id="scaleval"></span>)</label><br/>
                <input type="range" id="scalerange" name="scale" min="1" max="40" value="${this.probabilities[0]}" />
                <br/>
                <label for="n0">0 neighbours (<span id="n0val"></span>)</label><br/>
                <input type="range" id="n0range" name="n0" min="0" max="100" value="${this.probabilities[0]}" />
                <br/>
                <label for="n1">1 neighbour (<span id="n1val"></span>)</label><br/>
                <input type="range" id="n1range" name="n1" min="0" max="100" value="${this.probabilities[1]}" />
                <br/>
                <label for="n2">2 neighbours (<span id="n2val"></span>)</label><br/>
                <input type="range" id="n2range" name="n2" min="0" max="100" value="${this.probabilities[2]}" />
                <br/>
                <label for="n3">3 eighbours (<span id="n3val"></span>)</label><br/>
                <input type="range" id="n3range" name="n3 min="0" max="100" value="${this.probabilities[3]}" />
                <br/>
                <label for="n4">4 neighbours (<span id="n4val"></span>)</label><br/>
                <input type="range" id="n4range" name="n4" min="0" max="100" value="${this.probabilities[4]}" />
                <br/>
                <button id="run">Run</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
        this.element = document.getElementById('config') as HTMLDivElement;
        this.element = document.getElementById('overlay') as HTMLDivElement;

        document.getElementById('run').addEventListener('click', () => this.save());

        for (let i = 0; i < this.probabilities.length; i++) {
            document.getElementById(`n${i}val`).innerHTML = this.probabilities[i].toString();
        }

        document.getElementById(`scaleval`).innerHTML = this.scale.toString();
        (document.getElementById(`scalerange`) as HTMLInputElement).value = this.scale.toString();
        for (let i = 0; i <= 4; i++) {
            document.getElementById(`n${i}range`).onchange = (e: Event) => {
                const value = (e.currentTarget as HTMLInputElement).value;
                document.getElementById(`n${i}val`).innerHTML = value;
            };
        }
    }

    private save () {

        for (let i = 0; i <= 4; i++) {
            const range = document.getElementById(`n${i}range`) as HTMLInputElement;
            const value = parseInt(range.value, 10);
            this.probabilities[i] = value;
        }

        console.log(this.probabilities);

        this.callback(this.scale, this.probabilities);
    }
}
