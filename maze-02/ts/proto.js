enum Type {
    Down =          0b10000,
    Up =            0b01000,
    Horizontal =    0b00100,
    Left =          0b00010,
    Right =         0b00001
}

const size = 5;
const data = new Array(size * size).fill(0).map((x, i) => i % 2 === 1 ? Type.Down : Type.Up);
const todo = [0];

function update () {
    const index = todo.pop();

    if (index === undefined) { return; }

    const value = data[index];
    const neigh = [
        value & Type.Up ? index + size : undefined,
        value & Type.Down ? index - size : undefined,
        index % size > 0 ? index - 1 : undefined,
        index % size < size - 1 ? index + 1 : undefined
    ].map((x) => x !== undefined && typeof data[x] === 'number' ? x : undefined);

    const available = neigh.filter((x) => x !== undefined && (data[x] === Type.Down || data[x] === Type.Up));

    if (available.length > 1) { todo.push(index); }

    if (available.length > 0) {
        const picked = available[Math.floor(Math.random() * available.length)];

        if (index - size === picked) {
            // up
            data[index] |= Type.Horizontal;
            data[picked] |= Type.Horizontal;
        } else if (index + size === picked) {
            // down
            data[index] |= Type.Horizontal;
            data[picked] |= Type.Horizontal;
        } else if (index - 1 === picked) {
            // left
            data[index] |= Type.Left;
            data[picked] |= Type.Right;
        } else if (index + 1 === picked) {
            // right
            data[index] |= Type.Right;
            data[picked] |= Type.Left;
        }

        todo.push(picked);
    }
}

function translate (value) {
    const result = [];

    // if (value & Type.Down) {
    //     result.push('V');
    //     if (value & Type.Horizontal) { result.push('^'); }
    // }
    // if (value & Type.Up) {
    //     result.push('A');
    //     if (value & Type.Horizontal) { result.push('v'); }
    // }

    // if (value & Type.Left) { result.push('<'); }
    // if (value & Type.Right) { result.push('>'); }

    if (value === Type.Up) { result.push('x'); }
    if (value === (Type.Up | Type.Horizontal)) { result.push('v'); }
    if (value === (Type.Up | Type.Left)) { result.push('<'); }
    if (value === (Type.Up | Type.Right)) { result.push('>'); }
    if (value === (Type.Up | Type.Right | Type.Left)) { result.push('─'); }
    if (value === (Type.Up | Type.Right | Type.Horizontal)) { result.push('┌'); }
    if (value === (Type.Up | Type.Left | Type.Horizontal)) { result.push('┐'); }
    if (value === (Type.Up | Type.Right | Type.Left | Type.Horizontal)) { result.push('┬'); }

    if (value === Type.Down) { result.push('x'); }
    if (value === (Type.Down | Type.Horizontal)) { result.push('^'); }
    if (value === (Type.Down | Type.Left)) { result.push('<'); }
    if (value === (Type.Down | Type.Right)) { result.push('>'); }
    if (value === (Type.Down | Type.Right | Type.Left)) { result.push('─'); }
    if (value === (Type.Down | Type.Right | Type.Horizontal)) { result.push('└'); }
    if (value === (Type.Down | Type.Left | Type.Horizontal)) { result.push('┘'); }
    if (value === (Type.Down | Type.Right | Type.Left | Type.Horizontal)) { result.push('┴'); }

    return result.join(' ');
}

while (todo.length > 0) { update(); }

console.log(data);
console.log(data.map((x) => x.toString(2)));
console.log(data.map((x) => translate(x)).join(''));