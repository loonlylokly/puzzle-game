class Timer {
    constructor(timerElem, seconds = 0, secs = 0, mins = 0, hrs = 0, interval = null) {
        this.seconds = seconds;
        this.secs = secs;
        this.mins = mins;
        this.hrs = hrs;
        this.interval = interval;
        this.timerElem = timerElem;
    }

    setSeconds(seconds) {
        this.seconds = seconds;
    }

    start() {
        if (this.interval) return;
        this.interval = setInterval(this.tick.bind(this), 1000);
    }


    stop() {
        clearInterval(this.interval);
        this.interval = null;
        return `${this.hrs}:${this.mins}:${this.secs}`;
    }


    reset() {
        this.stop();
        this.seconds = 0;
        this.timerElem.innerText = '00:00:00';
    }


    tick() {
        this.seconds++;

        this.hrs = Math.floor(this.seconds / 3600);
        this.mins = Math.floor((this.seconds - (this.hrs * 3600)) / 60);
        this.secs = this.seconds % 60;

        if (this.secs < 10) this.secs = '0' + this.secs;
        if (this.mins < 10) this.mins = '0' + this.mins;
        if (this.hrs < 10) this.hrs = '0' + this.hrs;

        this.timerElem.innerText = `${this.hrs}:${this.mins}:${this.secs}`;
    }
}

export default Timer;