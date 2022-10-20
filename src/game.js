import Field from './field.js';
import Timer from './timer.js';
import Score from './score.js';

class Game {
    constructor(wrapper, wrap_size, timerElem, scoreElem, size = 3) {
        this.wrap_size = wrap_size;
        this.size = size;
        this.field = new Field(wrapper, this.size, wrap_size),
        this.timer = new Timer(timerElem);
        this.score = new Score(scoreElem);
    }


    start() {
        this.timer.start();
        this.score.reset();
        this.render();
    }


    restart(size = null, wrap_size = null) {
        if (size) this.size = size;
        if (wrap_size) this.wrap_size = wrap_size;
        this.field.reset(this.size, this.wrap_size);
        this.render();
        this.timer.reset();
        this.timer.start();
        this.score.reset();
    }
    

    changeCellsSize (wrap_size) {
        this.wrap_size = wrap_size;
        this.field.changeFieldSize(this.wrap_size);
    }


    render() {
        for (let row = 0, count = 1; row < this.field.size; row++) {
            this.field.push_row();
            for (let col = 0; col < this.field.size; col++, count++) {
                if (count === (this.field.size*this.field.size)) count = 0;
                this.field.addNewCell(row, col, count, this.move.bind(this));
            }
        }
    }


    move() {
        return function(event) {
            let cell = this.field.findCell(Number(event.target.classList[1].split('-')[1]));
            let emptyCell = this.field.getEmptyCell(cell.position.y, cell.position.x);
            if (emptyCell) {
                this.field.swapCells({row: cell.position.y, col: cell.position.x}, {row: emptyCell.position.y, col: emptyCell.position.x});
                this.score.incrementScore();
            }
        }.bind(this);
    }
    
    
    isSolved() {}
}

export default Game;