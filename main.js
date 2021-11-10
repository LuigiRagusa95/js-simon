const timerEl = document.getElementById('timer');
const popUpEl = document.getElementById('popup');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const confirmBtn = document.getElementById('confirm-btn');
const inputField = document.getElementById('input-field');
const numberText = document.getElementById('number-text');

let timer = 5;
let numLength = 5;
let canPlay = true;
let actualNumber = 0;
inputField.value = '';

const resetTimer = (number) => (timer = number || 30);
const message = (string) => (numberText.innerText = `${string}`);
const setMaxLength = (input, length) => input.setAttribute('maxLength', length);
const randomInt = (length) => Math.floor(Math.random() * (9 * Math.pow(10, length - 1))) + Math.pow(10, length - 1);
const showPopUp = (status) => (status === true ? popUpEl.classList.add('active') : popUpEl.classList.remove('active'));

const allowOnlyNumber = (input) =>
    input.addEventListener('keydown', (event) => {
        var charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
        return true;
    });

const validateNumber = (number) => (parseInt(number) === actualNumber ? true : false);

startBtn.addEventListener('click', () => {
    if (canPlay) {
        canPlay = false;
        timerEl.classList.add('active');
        setMaxLength(inputField, numLength);
        actualNumber = randomInt(numLength);
        startBtn.classList.remove('active');
        numberText.innerText = actualNumber;
        timerEl.textContent = `Tempo: ${timer}`;

        const time = setInterval(() => {
            timer--;
            timerEl.textContent = `Tempo: ${timer}`;
            if (timer === 0) {
                message('');
                resetTimer(5);
                showPopUp(true);
                allowOnlyNumber(inputField);
                startBtn.textContent = `Restart`;
                startBtn.classList.add('active');
                timerEl.classList.remove('active');
                clearInterval(time);
            }
        }, 1000);
    }
});

confirmBtn.addEventListener('click', () => {
    console.log(inputField.value);
    if (validateNumber(inputField.value)) {
        showPopUp(false);
        message(`Complimenti hai vinto! Il numero da ricordare era ${actualNumber}`);
        inputField.value = '';
    } else {
        showPopUp(false);
        message(`Hai perso! Il numero da ricordare era ${actualNumber} e tu ${inputField.value === '' ? 'non hai inserito nessun valore' : `hai inserito ${inputField.value}`}`);
        inputField.value = '';
    }
    canPlay = true;
});
