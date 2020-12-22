let lastOperand = 0,
    operation = null,
    currentExpression = '';

const inputWindow = document.getElementById('inputWindow');
const historyList = document.getElementById('history');

function calculate(a, b, c) {
    switch (c) {
        case '+':
            return 1 * a + 1 * b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        case 'sqrt':
            return Math.sqrt(a);
        default:
            window.alert('Незивестная операция');
            break;
    }
}

function resetCalc() {
    operation = null;
    currentExpression = '';
    lastOperand = inputWindow.value = 0;
}

function writeHistory(message) {
    let li = document.createElement('li');
    li.innerText = message;
    historyList.appendChild(li);
}

resetCalc();

document
    .getElementById('buttons')
    .addEventListener('click', function (event) {
        const target = event.target;

        if (!target.classList.contains('btn')) {
            return true;
        }

        let btnOperand = target.textContent;
        let newValue = currentExpression + '' + btnOperand;
        let operationFinished = false;

        if (isNaN(btnOperand)) {
            switch (btnOperand) {
                case 'C':
                    resetCalc();

                    return false;
                case '=':
                    let expressionParts = null;

                    if (operation === 'sqrt') {
                        expressionParts = currentExpression.match(/([\d.-]+)/);
                    } else {
                        expressionParts = currentExpression.match(/(.+)([+\-*\/])(.+)/);
                    }

                    if (expressionParts && expressionParts.length === 4) {
                        newValue = calculate(expressionParts[1], expressionParts[3], expressionParts[2]);
                        lastOperand = 0;
                        operation = null;
                    } else if (expressionParts && expressionParts.length === 2) {
                        newValue = calculate(expressionParts[1], null, operation);
                        lastOperand = 0;
                        operation = null;
                    } else {
                        window.alert('Некорректное выражение');

                        newValue = null;
                    }

                    if (newValue !== null && isNaN(newValue)) {
                        window.alert('Недопустимая операция');

                        resetCalc();

                        return false;
                    }

                    btnOperand = null;
                    operationFinished = true;

                    break;
                default:
                    if (operation === null) {
                        if (target.classList.contains('sqrt')) {
                            operation = 'sqrt';
                        } else {
                            if (currentExpression === '') {
                                if (btnOperand !== '-') {
                                    newValue = null;
                                } else {
                                    newValue = currentExpression + '' + btnOperand;
                                }
                            } else {
                                operation = btnOperand;
                            }
                        }
                    } else {
                        newValue = null;
                    }

                    break;
            }
        } else {
            if (btnOperand === '0') {
                if (1 * currentExpression === 0) {
                    newValue = null;
                } else {
                    lastOperand = btnOperand;
                }
            } else {
                if (1 * currentExpression === 0) {
                    newValue = btnOperand;
                }

                lastOperand = btnOperand;
            }
        }

        if (newValue !== null) {
            if (operationFinished) {
                writeHistory(inputWindow.value + '=' + newValue);
            }

            inputWindow.value = currentExpression = newValue;
        }
    });
