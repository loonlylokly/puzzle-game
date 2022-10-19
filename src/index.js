const body = document.querySelector('body');
const header = document.createElement("header");
const main = document.createElement("main");
const menu = document.createElement("div");
const menu_select = document.createElement("select");
const score = document.createElement("div");
const turns = document.createElement("span");
const times = document.createElement("span");
const wrapper_header = document.createElement('div');
const wrapper_main = document.createElement('div');
const field = document.createElement('div');
const cell = document.createElement('div');
let size = 3;


let menu_difficulty = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8']
let menu_buttons = ['New game', 'Sound', 'Records'];
let mapNumber = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
];
// let map = [];

menu_buttons = menu_buttons.map(item => {
    let elem = document.createElement("button");
    elem.classList.add('menu__button-'+item.split(' ').join(''));
    elem.innerHTML = item;
    return elem;
})
menu_difficulty = menu_difficulty.map(item => {
    let elem = document.createElement("option");
    elem.innerHTML = item;
    return elem;
})

// for (let i = 0, count = 0; i < mapNumber.length; i++) {
//     map.push([]);
//     for (let j = 0; j < mapNumber[i].length;j++) {
//         map[i].push(document.createElement("div"));
//         map[i][j].classList.add('cell');
//         map[i][j].classList.add('cell-'+count);
//         map[i][j].classList.add('cell-'+i+'-'+j);
//         // map[i][j].addEventListener('click', moveCell);
//         count++;
//     }
// }

body.appendChild(header);
body.appendChild(main);
header.appendChild(wrapper_header);
wrapper_header.appendChild(menu);
main.appendChild(wrapper_main);
wrapper_main.appendChild(score);
menu_select.replaceChildren(...menu_difficulty);
menu.replaceChildren(menu_select,...menu_buttons);
score.replaceChildren(turns, times);
// wrapper_main.appendChild(field);
// map.forEach((row) => row.forEach((cell) => field.appendChild(cell)))

turns.innerHTML = '0';
times.innerHTML = '00:00:00'

wrapper_header.classList.add('wrapper');
wrapper_main.classList.add('wrapper');
menu.classList.add('menu');
menu_select.classList.add('menu__field-size');
score.classList.add('score');
turns.classList.add('score__turns');
times.classList.add('score__times');

class Cell {
    constructor({ position, elem, cellSize = 200 }) {
        this.cellSize = cellSize;
        this.position = position;
        this.elem = elem;
        this.elem.style.top = (position.y) * cellSize  + 'px';
        this.elem.style.left = (position.x) * cellSize + 'px';
    }

    draw({ position }) {
        this.elem.style.top = (position.y) * this.cellSize + 'px';
        this.elem.style.left = (position.x) * this.cellSize + 'px';
        this.position = position;
    }
}

class Field {
    constructor (size) {
        this.size = size;
        this.fieldNumber = [];
        for (let i = 0, count = 0; i < size; i++) {
            this.fieldNumber.push([]);
            for (let j = 0; j < size; j++) {
                this.fieldNumber[i].push(count);
            }
        }
        this.field = [];
    }

    push_row() {
        this.field.push([]);
    }

    push(row, item) {
        this.field[row].push(item);
    }

    getCell(row, col) {
        return this.field[row][col];
    }

    getEmptyCell(row, col) {
        if (row > (this.size-1) || col > (this.size-1) || row < 0 || col < 0) return null;
        if (row >= 0 && this.field[row-1][col] === 0) return this.field[row-1][col];
        if (col >= 0 && this.field[row][col-1] === 0) return this.field[row][col-1];
        if (row < (this.size-1) && this.field[row-1][col] === 0) return this.field[row+1][col];
        if (col < (this.size-1)&& this.field[row-1][col] === 0) return this.field[row][col+1];
    }

    swapCells(cell1, cell2) {
        console.log(this.field)
        let tmp = this.field[cell1.row][cell1.col];
        this.field[cell1.row][cell1.col] = this.field[cell2.row][cell2.col];
        this.field[cell2.row][cell2.col] = tmp;
        
        console.log(this.field,this.field[cell1.row][cell1.col], cell1.row, cell1.col);
        
        this.field[cell2.row][cell2.col].draw({
            position: {x: cell2.col, y: cell2.row},
        });
        this.field[cell1.row][cell1.col].draw({
            position: {x: cell1.col, y: cell1.row},
        });
    }
    
    shuffle() {
        let map = [];
    }
}

class Game {
    constructor(field = new Field(), state = 'ready', countMoves = 0) {
        this.field = field,
        this.time = 0;
        this.state = state;
        this.countMoves = countMoves;
    }

    start() {
        if (this.state === 'playing') return;
        this.render();
        this.startTimer();
    }

    stop() {}

    restart() {}

    setState(newState) {
        this.state = newState;
    }

    render(map) {
        const field = document.createElement('div');
        field.classList.add('field');
        wrapper_main.appendChild(field);
        for (let i = 0, count = 1; i < size; i++) {
            this.field.push_row();
            for (let j = 0; j < size; j++, count++) {
                let tmp = document.createElement('div');
                tmp.classList.add('cell');
                tmp.classList.add('cell-'+count%(size*size));
                tmp.classList.add('cell-'+i+'-'+j);
                tmp.addEventListener('click', this.move())
                field.appendChild(tmp);
                this.field.push(i, new Cell({
                    position: {x: j, y: i},
                    elem: tmp
                }))
            }
        }
        console.log(this.map);
    }

    move() {
        return function() {
            let row = Number(event.target.classList[2].split('-')[1]);
            let col = Number(event.target.classList[2].split('-')[2]);
            let emptyCell = this.findEmptyCell(row, col);
            this.swapCells({row: row, col: col}, {row: emptyCell.row, col: emptyCell.col});
            this.countMoves++;
            // console.log(row, col, typeof this.countMoves, this.countMoves)
        }.bind(this);
    }

    isSolved() {}

    startTimer() {}

    incrementMoves() {
        this.countMoves++;
    }

    
    isSolved() {
    
    }
}

const map = new Field(size);
const puzzle15 = new Game(map);
puzzle15.start();