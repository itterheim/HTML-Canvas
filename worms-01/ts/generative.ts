import { App } from './App';

declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        anim: number;
        interval: number;
    }
}

const dead = document.body.querySelector('canvas');
if (dead) {
    dead.parentNode.removeChild(dead);
}
window.cancelAnimationFrame(window.anim);
window.clearInterval(window.interval);

console.clear();
console.log(new Date());

new App();
