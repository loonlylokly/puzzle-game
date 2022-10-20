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


let menu_difficulty = [3, 4, 5, 6, 7, 8]
let menu_buttons = ['New game', 'Sound', 'Records'];
let size = 3;

menu_buttons = menu_buttons.map(item => {
    let elem = document.createElement("button");
    elem.classList.add('menu__button-'+item.split(' ').join(''));
    elem.innerHTML = item;
    return elem;
})
menu_difficulty = menu_difficulty.map(item => {
    let elem = document.createElement("option");
    elem.innerHTML = item+'x'+item;
    elem.value = item;
    return elem;
})

body.appendChild(header);
body.appendChild(main);
header.appendChild(wrapper_header);
wrapper_header.appendChild(menu);
main.appendChild(wrapper_main);
wrapper_main.appendChild(score);
menu_select.replaceChildren(...menu_difficulty);
menu.replaceChildren(menu_select,...menu_buttons);
score.replaceChildren(turns, times);

turns.innerHTML = '0';
times.innerHTML = '00:00:00'

wrapper_header.classList.add('wrapper');
wrapper_main.classList.add('wrapper');
menu.classList.add('menu');
menu_select.classList.add('menu__field-size');
score.classList.add('score');
turns.classList.add('score__turns');
times.classList.add('score__times');


menu_select.addEventListener('change', (event) => {
    size = event.target.value;
    console.log(event.target.value);
    puzzle15.restart();
})


class Cell {
    constructor({ position, elem, cellSize = 600/size, number}) {
        this.cellSize = cellSize;
        this.position = position;
        this.number = number;
        this.elem = elem;
        this.elem.style.top = (position.y) * cellSize + 'px';
        this.elem.style.left = (position.x) * cellSize + 'px';
        this.elem.style.width = cellSize + 'px';
        this.elem.style.height = cellSize + 'px';
        this.elem.style.backgroundPosition = cellSize*position.x*(-1)+'px'+ ' ' + cellSize*position.y*(-1)+'px';
    }

    draw({ position }) {
        this.position = position;
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
            for (let j = 0; j < size; j++, count++) {
                this.fieldNumber[i].push(count);
            }
        }
        this.field = [];
        this.fieldDiv = document.createElement('div');
        this.fieldDiv.classList.add('field');
        wrapper_main.appendChild(this.fieldDiv);
    }

    removeField() {
        wrapper_main.removeChild(this.fieldDiv);
    }

    push_row() {
        this.field.push([]);
    }

    push(row, item) {
        this.field[row].push(item);
    }

    findCell(number) {
        for (let i of this.field) {
            for (let j of i) {
                if (number === j.number)
                    return j;
            }
        }
    }

    getCell(row, col) {
        return this.field[row][col];
    }

    getEmptyCell(row, col) {
        if (row > (this.size-1) || col > (this.size-1) || row < 0 || col < 0) return null;
        if (row > 0 && this.field[row-1][col].number === 0) return this.field[row-1][col];
        if (col > 0 && this.field[row][col-1].number === 0) return this.field[row][col-1];
        if (row < (this.size-1) && this.field[row+1][col].number === 0) return this.field[row+1][col];
        if (col < (this.size-1) && this.field[row][col+1].number === 0) return this.field[row][col+1];
        return null;
    }

    swapCells(cell1, cell2) {
        let tmp = this.field[cell1.row][cell1.col];
        this.field[cell1.row][cell1.col] = this.field[cell2.row][cell2.col];
        this.field[cell2.row][cell2.col] = tmp;

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
    constructor(field = new Field(size), state = 'ready', countMoves = 0) {
        this.field = field,
        this.time = 0;
        this.state = state;
        this.countMoves = countMoves;
    }

    start() {
        if (this.state === 'playing') return;
        this.state = 'playing';
        this.render();
        this.startTimer();
    }

    stop() {}

    restart() {
        if (this.state === 'playing') {
            this.field.removeField();
            this.field = new Field(size);
            this.render();
            this.startTimer();
        }
    }

    setState(newState) {
        this.state = newState;
    }

    render() {
        for (let i = 0, count = 1; i < size; i++) {
            this.field.push_row();
            for (let j = 0; j < size; j++, count++) {
                if (count === (this.field.size*this.field.size)) count = 0;
                let tmp = document.createElement('div');
                tmp.classList.add('cell');
                tmp.classList.add('cell-'+count%(size*size));
                tmp.classList.add('cell-'+i+'-'+j);
                tmp.addEventListener('click', this.move())
                this.field.fieldDiv.appendChild(tmp);
                this.field.push(i, new Cell({
                    position: {x: j, y: i},
                    elem: tmp,
                    number: count
                }))
            }
        }
    }

    move() {
        return function(event) {
            let cell = this.field.findCell(Number(event.target.classList[1].split('-')[1]));
            let emptyCell = this.field.getEmptyCell(cell.position.y, cell.position.x);
            this.field.swapCells({row: cell.position.y, col: cell.position.x}, {row: emptyCell.position.y, col: emptyCell.position.x});
            this.countMoves++;
        }.bind(this);
    }

    isSolved() {}

    startTimer() {}
    
    isSolved() {}
}

const map = new Field(size);
const puzzle15 = new Game(map);
puzzle15.start();