function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Erreur';
    }
}

function deleteLastCharacter() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function changeSign() {
    const display = document.getElementById('display');
    display.value = -display.value;
}

function squareRoot() {
    const display = document.getElementById('display');
    display.value = Math.sqrt(display.value);
}

function square() {
    const display = document.getElementById('display');
    display.value = Math.pow(display.value, 2);
}

document.addEventListener('keydown', function(event) {
    const display = document.getElementById('display');
    const key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLastCharacter();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
