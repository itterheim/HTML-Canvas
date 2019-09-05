const width = 10;
const height = 10;
const data = new Array(width * height).fill(0);
const todo = [Math.floor(Math.random() * data.length)];

function getNextIndex (index, direction) {
    if (direction === 1) { return index - width; }
    if (direction === 2) { return index + 1; }
    if (direction === 4) { return index + width; }
    if (direction === 8) { return index - 1; }
    return undefined;
}

function getOpposite (direction) {
    if (direction === 1) { return 4; }
    if (direction === 4) { return 1; }
    if (direction === 2) { return 8; }
    if (direction === 8) { return 2; }
    return 0;
}

function asText (direction) {
    if (direction === 0b0000) { return 'O'; }
    if (direction === 0b0001) { return '^'; }
    if (direction === 0b0010) { return '>'; }
    if (direction === 0b0100) { return 'v'; }
    if (direction === 0b1000) { return '<'; }
    if (direction === 0b0011) { return '└'; }
    if (direction === 0b0110) { return '┌'; }
    if (direction === 0b1100) { return '┐'; }
    if (direction === 0b1001) { return '┘'; }
    if (direction === 0b1010) { return '─'; }
    if (direction === 0b0101) { return '│'; }
    if (direction === 0b1110) { return '┬'; }
    if (direction === 0b0111) { return '├'; }
    if (direction === 0b1011) { return '┴'; }
    if (direction === 0b1101) { return '┤'; }
    if (direction === 0b1111) { return '┼'; }

    return '';
}

function update (mess) {
    const index = Math.random() > mess ? todo.splice(Math.floor(Math.random() * todo.length), 1)[0] : todo.pop();
    // const index = Math.random() > mess ? todo.splice(Math.floor(Math.random() * todo.length), 1)[0] : todo.shift();

    const neighbors = [
        data[index - width],
        index % width < width - 1 ? data[index + 1] : undefined,
        data[index + width],
        index % width > 0 ? data[index - 1] : undefined
    ];

    const available = neighbors.map((x, i) => (x === 0 ? Math.pow(2, i) : undefined)).filter((x) => Boolean(x));

    if (available.length > 1) { todo.push(index); }

    if (available.length > 0) {
        const picked = available[Math.floor(Math.random() * available.length)];
        const nextIndex = getNextIndex(index, picked);

        data[index] |= picked;
        data[nextIndex] |= getOpposite(picked);

        todo.push(nextIndex);
    }
}

function format (d) {
    let result = '\n';
    for (let i = 0; i < d.length; i += width) {
        result += d.slice(i, i + width).join('') + '\n';
    }

    return result;
}

function printGrid (d) {
    let x = '';
    for (const cell of d) {
        if (cell & 0b0100) {
            x += ' ';
        } else {
            x += '_';
        }

        if (cell & 0b0010) {
            x += ' ';
        } else {
            x += '|';
        }
    }
    console.log('(' + x + ')');
}

while (todo.length > 0) { update(1); }
// console.log('%c ' + format(), 'color: #eee');
// console.log(data);
printGrid(data);

//  _ _ _ _ _ _ _ _ _ _
// |_ _ _ _  |_ _ _  | |
// |_  | |_ _ _  |_  | |
// |_ _ _ _ _ _ _      |
// |  _ _ _ _ _ _  | | |
// | |_ _   _      | | |
// | |  _  |   |_| |_| |
// | |_| | | |_|_  |_  |
// |_|  _ _|_|     |_  |
// |  _| |_  |_|_| |   |
// |_|_ _ _ _ _ _ _|_|_|

//  _ _ _ _ _ _ _ _ _ _
// |_ _ _  |_ _   _ _ _|
// |  _| |_   _ _ _|   |
// |   |        _| | |_|
// |_|  _|_| |    _    |
// |  _|_  | | |  _|_|_|
// | |_  |_  | |  _   _|
// |_|   |   | |_| |_  |
// |_  |  _| |_ _|  _|_|
// | |_| |_    |_  | | |
// |_ _ _|_ _|_ _ _ _ _|

//  _ _ _ _ _ _ _ _ _ _
// |_ _  | |_  |  _ _| |
// |_  | |_  | | |  _ _|
// | |_  | |_ _   _ _ _|
// |_   _ _         _  |
// |  _|  _ _| | |   |_|
// | |  _|_    | | |_  |
// |_| |_   _| | |_  | |
// |  _|  _|   |   |_| |
// |_|  _|  _| | |_  | |
// |_ _|_ _|_ _|_ _|_|_|


//  _ _ _ _ _ _ _ _ _ _
// | | |  _ _  |  _    |
// |  _| | |  _|  _| | |
// |_ _ _| | |_ _|  _|_|
// |   |_  |_ _  |  _  |
// | |_  |  _  | | |  _|
// | | |_ _|  _| | |_  |
// | | |  _ _|  _|_ _| |
// | |_ _ _|  _|    _  |
// |  _ _  |_  |_| |  _|
// |_ _ _|_ _ _ _ _|_ _|