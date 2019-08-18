export class Controls {
    public up = false;
    public down = false;
    public left = false;
    public right = false;

    private readonly keys = {
        up: ['w', 'ArrowUp', ''],
        down: ['s', 'ArrowDown'],
        left: ['a', 'ArrowLeft'],
        right: ['d', 'ArrowRight']
    };

    constructor () {
        document.onkeydown = (e) => this.keyDown(e);
        document.onkeyup = (e) => this.keyUp(e);
    }

    private keyDown (e: KeyboardEvent) {

        if (this.keys.up.indexOf(e.key) > -1) {
            e.preventDefault();
            this.up = true;
        } else if (this.keys.down.indexOf(e.key) > -1) {
            e.preventDefault();
            this.down = true;
        } else if (this.keys.left.indexOf(e.key) > -1) {
            e.preventDefault();
            this.left = true;
        } else if (this.keys.right.indexOf(e.key) > -1) {
            e.preventDefault();
            this.right = true;
        }
    }

    private keyUp (e: KeyboardEvent) {
        if (this.keys.up.indexOf(e.key) > -1) {
            e.preventDefault();
            this.up = false;
        } else if (this.keys.down.indexOf(e.key) > -1) {
            e.preventDefault();
            this.down = false;
        } else if (this.keys.left.indexOf(e.key) > -1) {
            e.preventDefault();
            this.left = false;
        } else if (this.keys.right.indexOf(e.key) > -1) {
            e.preventDefault();
            this.right = false;
        }
    }
}
