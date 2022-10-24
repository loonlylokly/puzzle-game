import Field from './field.js';
import Timer from './timer.js';
import Score from './score.js';
import Records from './records.js';

class Game {
    constructor(wrapper, wrap_size, timerElem, scoreElem, size = 3) {
        this.wrap_size = wrap_size;
        this.size = size;
        this.field = new Field(wrapper, this.size, wrap_size),
        this.timer = new Timer(timerElem);
        this.score = new Score(scoreElem);
        this.records = new Records();
    }


    start() {
        this.timer.start();
        this.score.reset();
        console.log(localStorage.getItem('gameSave'));
        if (localStorage.getItem('gameSave') !== 'undefined' || localStorage.getItem('gameSave') !== null) this.load();
        else {
            this.render();
            this.field.shuffle();
            this.timer.reset();
            this.timer.start();
            this.score.reset();
        }
        // this.render();
        // this.records.addNewRecord(this.score.score, this.timer.timerElem.innerText)
    }


    restart(size = null, wrap_size = null) {
        if (size) this.size = size;
        if (wrap_size) this.wrap_size = wrap_size;
        localStorage.setItem('gameSave', 'undefined')
        this.field.reset(this.size, this.wrap_size);
        this.render();
        this.field.shuffle();
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
                this.playSound();
                this.save();
                if (this.field.isSolved()) this.win();
            }
        }.bind(this);
    }


    save() {
        let arr = [];
        for(let i = 0; i < this.field.size; i++) {
            arr.push([]);
            for(let j = 0; j < this.field.size; j++) {
                arr[i].push(this.field.field[i][j].number);
            }
        }

        let save = JSON.stringify({
            field: arr,
            seconds: this.timer.seconds,
            score: this.score.score,
            size: this.size,
            wrap_size: this.wrap_size
        })
        localStorage.setItem('gameSave', save)
    }


    load() {
        let gameSave = JSON.parse(localStorage.getItem('gameSave'));
        let arr = gameSave.field;
        this.timer.setSeconds(gameSave.seconds);
        this.timer.start();
        this.score.score = Number(gameSave.score);
        this.score.scoreElem.innerText = this.score.score;
        this.size = Number(gameSave.size);
        this.wrap_size = Number(gameSave.wrap_size);
        this.field.size = this.size;
        this.field.wrap_size = this.wrap_size;

        for (let row = 0, count = 0; row < arr.length; row++) {
            this.field.push_row();
            for (let col = 0; col < arr.length; col++, count++) {
                this.field.addNewCell(row, col, arr[row][col], this.move.bind(this));
            }
        }
    }


    win() {
        this.records.save(this.score.score, this.timer.timerElem.innerText);
        console.log('Win');
    }

    
    records() {
        this.records.show();
        console.log('records');
    }


    playSound() {}
}

export default Game;