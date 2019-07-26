import { App } from './App';

declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        anim: number;
        interval: number;
        timeout: number;
    }
}

let dead = document.body.querySelectorAll('canvas') as NodeList;
for (const item of dead) {
    item.parentNode.removeChild(item);
}
dead = document.body.querySelectorAll('div') as NodeList;
for (const item of dead) {
    item.parentNode.removeChild(item);
}
window.cancelAnimationFrame(window.anim);
window.clearInterval(window.interval);
window.clearInterval(window.timeout);

console.clear();
console.log(new Date());

new App();
