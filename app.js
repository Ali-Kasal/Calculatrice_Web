// Tableau pour stocker l'historique
const history = [];

// Fonction pour ajouter un élément à l'historique
function addToHistory(expression, result) {
    const historyContainer = document.getElementById('history');
    const historyItem = document.createElement('li');
    historyItem.textContent = `${expression} = ${result}`;
    historyContainer.appendChild(historyItem);

    // Ajouter à l'historique en mémoire
    history.push({ expression, result });

    // Garder seulement les 10 derniers calculs
    if (history.length > 10) {
        history.shift();
        historyContainer.removeChild(historyContainer.firstChild);
    }
}

// Fonction pour valider et calculer une expression mathématique
function calculateResult() {
    const display = document.getElementById('display');
    const expression = display.value;

    try {
        // Validation de l'expression (autorisation de ^ pour les exposants)
        if (/[^0-9+\-*/.^() ]/.test(expression)) {
            throw new Error('Expression invalide');
        }

        // Remplacement de ^ par ** pour que JavaScript puisse le traiter
        const sanitizedExpression = expression.replace(/\^/g, '**');

        // Calcul de l'expression
        const result = eval(sanitizedExpression);

        // Mise à jour de l'écran et ajout à l'historique
        display.value = result;
        addToHistory(expression, result);
    } catch (error) {
        display.value = 'Erreur';
        console.error('Erreur lors du calcul :', error.message);
    }
}


// Fonction pour ajouter une valeur à l'écran
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

// Fonction pour effacer l'écran
function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

// Fonction pour supprimer le dernier caractère
function deleteLastCharacter() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// Fonction pour changer le signe
function changeSign() {
    const display = document.getElementById('display');
    display.value = display.value ? -parseFloat(display.value) : '';
}

// Fonction pour calculer la racine carrée
function squareRoot() {
    const display = document.getElementById('display');
    try {
        const value = parseFloat(display.value);
        if (isNaN(value)) throw new Error('Valeur invalide');
        display.value = Math.sqrt(value);
        addToHistory(`√(${value})`, display.value);
    } catch {
        display.value = 'Erreur';
    }
}

// Fonction pour calculer le carré
function square() {
    const display = document.getElementById('display');
    try {
        const value = parseFloat(display.value);
        if (isNaN(value)) throw new Error('Valeur invalide');
        display.value = Math.pow(value, 2);
        addToHistory(`${value}²`, display.value);
    } catch {
        display.value = 'Erreur';
    }
}

//Fonction pour calculer un exposant
function exponent() {
    const display = document.getElementById('display');
    try {
        const value = parseFloat(display.value);
        if (isNaN(value)) throw new Error('Valeur invalide');
        display.value = Math.pow(value, 3);
        addToHistory(`${value}^3`, display.value);
    } catch {
        display.value = 'Erreur';
    }
}


// Fonction pour calculer un exposant quelconque
function calculateExponent() {
    const display = document.getElementById('display');

    try {
        // Vérifier si l'expression contient bien le symbole '^'
        if (!display.value.includes('^')) {
            throw new Error("L'expression ne contient pas d'exposant.");
        }

        // Séparer la base et l'exposant
        const parts = display.value.split('^');
        console.log('Parts après split:', parts);

        // Validation du nombre de parties
        if (parts.length !== 2) {
            throw new Error("Expression mal formée. Utilisez 'base^exposant'.");
        }

        const base = parseFloat(parts[0].trim());
        const exponent = parseFloat(parts[1].trim());
        console.log('Base:', base, 'Exposant:', exponent);

        // Vérification des valeurs
        if (isNaN(base) || isNaN(exponent)) {
            throw new Error("Base ou exposant invalide.");
        }

        // Calcul de l'exposant
        const result = Math.pow(base, exponent);

        // Mise à jour de l'écran et ajout à l'historique
        display.value = result;
        addToHistory(`${base}^${exponent}`, result);
    } catch (error) {
        display.value = 'Erreur';
        console.error('Erreur lors du calcul de l\'exposant :', error.message);
    }
}




// Événements clavier
document.addEventListener('keydown', function (event) {
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

document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key === '^') {
        appendToDisplay('^');
    }
});










