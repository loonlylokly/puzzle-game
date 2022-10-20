class Cell {
    constructor({ position, cellSize, number, callback, size}) {
        this.cellSize = cellSize;
        this.position = position;
        this.number = number;
        this.size = size;
        this.elem = null;
        this.callback = callback;
        this.setCell();
        this.setStyleCell();
    }


    setCell() {
        this.elem = document.createElement('div');
        this.elem.classList.add('cell');
        this.elem.classList.add('cell-'+this.number);
        this.elem.classList.add('cell-'+this.position.y+'-'+this.position.x);
        this.elem.addEventListener('click', this.callback());
    }


    setStyleCell() {
        this.elem.style.top = (this.position.y) * this.cellSize + 'px';
        this.elem.style.left = (this.position.x) * this.cellSize + 'px';
        this.elem.style.width = this.cellSize + 'px';
        this.elem.style.height = this.cellSize + 'px';
        this.elem.style.backgroundSize = this.cellSize*this.size + 'px';
        this.elem.style.backgroundPosition = this.cellSize*Math.floor((this.number-1)%this.size)*(-1)+'px'+ ' ' +
                                                this.cellSize*Math.floor((this.number-1)/this.size)*(-1)+'px';
    }


    changeCellSize(cellSize) {
        this.cellSize = cellSize;
        this.elem.style.top = (this.position.y) * this.cellSize + 'px';
        this.elem.style.left = (this.position.x) * this.cellSize + 'px';
        this.elem.style.width = this.cellSize + 'px';
        this.elem.style.height = this.cellSize + 'px';
        this.elem.style.backgroundSize = this.cellSize*this.size + 'px';
        this.elem.style.backgroundPosition = this.cellSize*Math.floor((this.number-1)%this.size)*(-1)+'px'+ ' ' +
                                                this.cellSize*Math.floor((this.number-1)/this.size)*(-1)+'px';
    }
    

    draw({ position }) {
        this.position = position;
        this.elem.style.top = (this.position.y) * this.cellSize + 'px';
        this.elem.style.left = (this.position.x) * this.cellSize + 'px';
    }
}

export default Cell;