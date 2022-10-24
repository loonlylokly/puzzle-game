import Cell from './cell.js';

class Field {
    constructor (wrapper, size, wrap_size) {
        this.wrapper = wrapper;
        this.size = size;
        this.wrap_size = wrap_size;
        this.field = [];
        this.fieldDiv = null;
        this.setFieldElem(wrap_size);
    }


    setField() {
        
    }


    setFieldElem(wrap_size) {
        this.fieldDiv = document.createElement('div');
        this.fieldDiv.classList.add('field');
        this.wrapper.appendChild(this.fieldDiv);
        this.fieldDiv.style.width = wrap_size + 'px';
        this.fieldDiv.style.height = wrap_size + 'px';
    }


    addNewCell(row, col, count, callback) {
        let cell = new Cell({
            position: {x: col, y: row},
            cellSize: this.wrap_size/this.size,
            number: count%(this.size*this.size),
            callback: callback,
            size: this.size
        })
        this.fieldDiv.appendChild(cell.elem);
        this.field[row].push(cell);
    }


    reset(size, wrap_size) {
        this.wrapper.removeChild(this.fieldDiv);
        this.size = size;
        this.wrap_size = wrap_size;
        this.field = [];
        this.fieldDiv = null;
        this.setFieldElem(wrap_size);
    }


    push_row() {
        this.field.push([]);
    }


    findCell(number) {
        for (let i of this.field) {
            for (let j of i) {
                if (number === j.number)
                    return j;
            }
        }
    }


    changeFieldSize(wrap_size) {
        this.fieldDiv.style.width = wrap_size + 'px';
        this.fieldDiv.style.height = wrap_size + 'px';
        for (let i of this.field) {
            for (let j of i) {
                j.changeCellSize(wrap_size/this.size);
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
        for(let i = 0; i < this.field.length; i++) {
            for(let j = 0; j < this.field.length; j++) {
                const randJ = Math.floor(Math.random() * this.field.length);
                const randI = Math.floor(Math.random() * this.field.length);
                this.swapCells(
                    {row: this.field[i][j].position.y, col: this.field[i][j].position.x},
                    {row: this.field[randI][randJ].position.y, col: this.field[randI][randJ].position.x}
                )
            }
        }
        if (!this.isCorrect()) this.shuffle();
    }

    isSolved() {
        for(let i = 0; i < this.field.length; i++) {
            for(let j = 0; j < this.field.length; j++) {
                if (!this.field[i][j].isSolved()) return false;
            }
        }
        return true;
    }

    isCorrect() {
        let invCount = 0;
        let arr = this.field.flat();
        for (let i = 0; i < 9 - 1; i++)
            for (let j = i+1; j < 9; j++)
                if (arr[j].number && arr[i].number &&  arr[i].number > arr[j].number)
                    invCount++;
        return (invCount%2 == 0)
    }
}

export default Field;