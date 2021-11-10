const timerEl = document.getElementById('timer');
const popUpEl = document.getElementById('popup');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const confirmBtn = document.getElementById('confirm-btn');
const inputField = document.getElementById('input-field');
const numberText = document.getElementById('number-text');

let timer = 30;
let numLength = 5;
let canPlay = true;
let actualNumber = 0;
inputField.value = '';

const resetTimer = (number) => (timer = number || 30);
const message = (string) => (numberText.innerHTML = `${string}`);
const setMaxLength = (input, length) => input.setAttribute('maxLength', length);

const randomInt = (length) => Math.floor(Math.random() * (9 * Math.pow(10, length - 1))) + Math.pow(10, length - 1);
const showPopUp = (status) => (status === true ? popUpEl.classList.add('active') : popUpEl.classList.remove('active'));
const allowOnlyNumber = (input) =>
    input.addEventListener('keydown', (event) => {
        let charCode = event.which ? event.which : event.keyCode;
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
        inputField.value.length !== numLength ? confirmBtn.classList.add('opacity') : confirmBtn.classList.remove('opacity');

        const time = setInterval(() => {
            timer--;
            timerEl.textContent = `Tempo: ${timer}`;
            if (timer === 0) {
                message('');
                resetTimer(5);
                showPopUp(true);
                inputField.focus();
                allowOnlyNumber(inputField);
                startBtn.textContent = `Riprova`;
                startBtn.classList.add('active');
                timerEl.classList.remove('active');
                clearInterval(time);
            }
        }, 1000);
    }
});

function fancyChecker(arr1, arr2) {
    let string = '';
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < numLength; i++) {
        if (arr1[i] === arr2[i]) {
            correct += String(i + 1).length;
            string += `<span class="t-correct">${arr2[i]}</span>`;
        } else {
            incorrect += String(i + 1).length;
            string += `<span class="t-incorrect">${arr2[i]}</span>`;
        }
    }
    return { string, correct, incorrect };
}

function giveMeTheMessage(value) {
    if (value.correct === 0) {
        message(`Che pessimo risultato... 0 su ${numLength}`);
    } else if (value.correct <= 2) {
        message(`Potevi fare di più... ne hai indovinate ${value.correct} su ${numLength}! ${value.string}`);
    } else if (value.correct > 2 && value.correct !== numLength) {
        message(`Mmmh...Non male come risultato!. Ne hai indovinate ${value.correct} su ${numLength}! ${value.string}`);
    }
}

confirmBtn.addEventListener('click', () => {
    const v = fancyChecker(String(actualNumber).split(''), String(inputField.value).split(''));
    if (inputField.value === '') return;
    else if (inputField.value !== '' && inputField.value.length >= numLength) {
        if (validateNumber(inputField.value)) {
            showPopUp(false);
            message(`Complimenti hai vinto! Il numero da ricordare era ${v.string}`);
            inputField.value = '';
        } else {
            showPopUp(false);
            giveMeTheMessage(v);
            inputField.value = '';
        }
        canPlay = true;
    }
});

inputField.addEventListener('input', () => {
    inputField.value.length >= numLength ? confirmBtn.classList.remove('opacity') : confirmBtn.classList.add('opacity');
});
