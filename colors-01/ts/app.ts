import { Renderer } from './Renderer';

declare global {
    interface Window { animation: number; }
}

window.cancelAnimationFrame(window.animation);
const dead = document.body.querySelectorAll('canvas');
for (const el of dead) {
    el.parentNode.removeChild(el);
}
console.clear();
console.log(new Date());

const renderer = new Renderer();

// default image
const defaultImage: HTMLImageElement = document.querySelector('img');
defaultImage.onload = () => {
    renderer.render(defaultImage);
};
if (defaultImage.complete) { renderer.render(defaultImage); }

// drop image from filesystem
renderer.canvas.addEventListener('drop', (e: DragEvent) => {
    e.preventDefault();

    window.cancelAnimationFrame(window.animation);

    for (const file of e.dataTransfer.files) {
        if (isValidImage(file)) {
            readFile(file);
            break;
        }
    }
});
renderer.canvas.addEventListener('dragover', (e) => { e.preventDefault(); });

function isValidImage (file: File): boolean {
    const valid = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp'];
    return valid.indexOf(file.type) > -1;
}

function readFile (file: File) {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent) => {
            const image = new Image();
            image.onload = () => {
                renderer.render(image);
            };
            image.src = reader.result as string;
        };

        reader.readAsDataURL(file);
}
