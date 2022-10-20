class Score {
    constructor(scoreElem, score = 0) {
        this.scoreElem = scoreElem;
        this.score = score;
    }
    

    reset() {
        this.score = 0;
        this.scoreElem.innerText = this.score;
    }


    incrementScore() {
        this.score++;
        this.scoreElem.innerText = this.score;
    }
}

export default Score;