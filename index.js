function add(num1, num2) {
     return (num1) + (num2);
}

function subtract(num1, num2) {
    return (num1) - (num2);
}

function multiply(num1, num2) {
    return (num1) * (num2);
}

function divide(num1, num2) {
    return num2 !== 0 ? (num1) / (num2) : alert("Error: Division by zero");
}

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            alert("Error: Invalid operator");
    }
}

function main() {
    let expression = prompt("Enter an operation: ");
    expression = expression.split(/(-?\d+)/).filter(num => num !== "");
    let num1 = Number(expression[0]);
    let operator = expression[1];
    let num2 = Number(expression[2]);

    console.log(operate(num1, operator, num2));
}

// main();