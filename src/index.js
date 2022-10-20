import Game from './game.js';

const body = document.querySelector('body');
const header = document.createElement("header");
const main = document.createElement("main");
const menu = document.createElement("div");
const menu_select = document.createElement("select");
const scores = document.createElement("div");
const score = document.createElement("span");
const timer = document.createElement("span");
const wrapper_header = document.createElement('div');
const wrapper_main = document.createElement('div');

const mediaQuery1 = window.matchMedia("(max-width: 701px)");
mediaQuery1.addEventListener('change', handleDisplayChange1);
const mediaQuery2 = window.matchMedia("(min-width: 700px)");
mediaQuery2.addEventListener('change', handleDisplayChange2);
const mediaQuery3 = window.matchMedia("(min-width: 460px)");
mediaQuery3.addEventListener('change', handleDisplayChange3);
const mediaQuery4 = window.matchMedia("(max-width: 461px)");
mediaQuery4.addEventListener('change', handleDisplayChange4);


let menu_difficulty = [3, 4, 5, 6, 7, 8]
let menu_buttons = ['New game', 'Sound', 'Records'];
let size = 3, wrap_size = 600;

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
wrapper_main.appendChild(scores);
menu_select.replaceChildren(...menu_difficulty);
menu.replaceChildren(menu_select,...menu_buttons);
scores.replaceChildren(score, timer);

score.innerHTML = '0';
timer.innerHTML = '00:00:00';

wrapper_header.classList.add('wrapper');
wrapper_main.classList.add('wrapper');
menu.classList.add('menu');
menu_select.classList.add('menu__field-size');
scores.classList.add('scores');
score.classList.add('score__score');
timer.classList.add('score__timer');

menu_select.addEventListener('change', (event) => {
    puzzle15.restart(event.target.value);
})

function handleDisplayChange1(mql) {
    if (!mql.matches) {
        puzzle15.changeCellsSize(600);
    }
}

function handleDisplayChange2(mql) {
    if (!mql.matches) {
        puzzle15.changeCellsSize(400);
    }
}

function handleDisplayChange3(mql) {
    if (!mql.matches) {
        puzzle15.changeCellsSize(280);
    }
}

function handleDisplayChange4(mql) {
    if (!mql.matches) {
        puzzle15.changeCellsSize(400);
    }
}

const puzzle15 = new Game(wrapper_main, wrap_size, timer, score, size);
puzzle15.start();

handleDisplayChange2(mediaQuery2);
handleDisplayChange3(mediaQuery3);
handleDisplayChange1(mediaQuery1);

menu_buttons[0].addEventListener('click', () => {puzzle15.restart()});