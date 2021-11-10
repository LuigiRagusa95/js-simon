const timerEl = document.getElementById('timer');
const popUpEl = document.getElementById('popup');
const messageEl = document.getElementById('message');
const startBtn = document.getElementById('start-btn');
const smallText = document.getElementById('small-text');
const inputField = document.getElementById('input-field');
const numberText = document.getElementById('number-text');

let timer = 5;
let canPlay = true;
let actualNumber = 0;
inputField.value = '';

const randomInt = (length) => Math.floor(Math.random() * (9 * Math.pow(10, length - 1))) + Math.pow(10, length - 1);

const allowOnlyNumber = (input) =>
    input.addEventListener('keydown', (event) => {
        var charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
        return true;
    });

const countdown = setInterval(() => {
    timer--;
    timerEl.innerText = timer;
    if (timer === 0) {
        clearInterval(countdown);
        popUpEl.classList.add('active');
        timerEl.classList.remove('active');
        messageEl.classList.remove('active');
        allowOnlyNumber(inputField);
    }
}, 1000);

startBtn.addEventListener('click', () => {
    startBtn.classList.remove('active');
    timerEl.classList.add('active');
    messageEl.classList.add('active');
    actualNumber = randomInt(5);
    numberText.innerText = actualNumber;

    countdown;
});
