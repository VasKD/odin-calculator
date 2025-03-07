function add(num1, num2) {
     return ((num1) + (num2)).toFixed(2);
}

function subtract(num1, num2) {
    return ((num1) - (num2)).toFixed(2);
}

function multiply(num1, num2) {
    return ((num1) * (num2)).toFixed(2);
}

function divide(num1, num2) {
    let quotient = (num1) / (num2);
    return num2 !== 0 ? quotient.toFixed(2) : alert("Error: Division by zero");
}

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            alert("Error: Invalid operator");
    }
}


// Variables
let display = document.getElementsByClassName("result");
let expression = document.getElementsByClassName("expression");
let buttons = document.querySelectorAll("button");
let values = [];
let operand = "";
let negateNum = 0;
let negated = false;


// evaluate the expression and display the result
function handleInput(input, negated = null) {
    console.log(input);
    if (negated) {
        console.log("negated is true");
        input = input.split(/(-?\d+\.\d+|-?\d+|\D)/).filter(num => num !== "");
        // Handle cases where the first number is negative
        if (Number(input[0]) < 0 && Number(input[1]) < 0) {
            console.log("first number is negative");
            let split = input[1].split("");
            input.pop();
            input.push(split[0]);
            input.push(split[1]);
        }
    } else {
        input = input.split(/(\d+\.\d+|\d+|\D)/).filter(num => num !== "");
    }

    console.log(input);

    let num1 = Number(input[0]);
    let operator = input[1];
    let num2 = Number(input[2]);

    let result = operate(num1, operator, num2);

    displayResult(result);
    displayExpression(`${num1} ${operator} ${num2} =`);
    return result;
}


// display the result on the calculator
function displayResult(result) {
    display[0].textContent = result; 
}

// display the expression on the calculator
function displayExpression(expr) {
    expression[0].textContent = expr;
    expression[0].style.color = "grey";
}



// event listeners
buttons.forEach(button => {
    button.addEventListener("click", function() {
        const value = button.getAttribute("data-value");
        
        if (["+", "-", "*", "/"].includes(value)) {
            operand = value;
            console.log(operand);
        }
        if (value === "negate") {
            handleNegateButton();
        } else if (value === "enter") {
            handleEnterButton();
        } else if (value === "clear") {
           handleClearButton();
        } else if (value === "delete") {
            handleDeleteButton();
        } else {
            handleNumberButton(value);
        }
    });
});



document.addEventListener("keydown", function(event) {
    const key = event.key;
    console.log(key);
    if (["+", "-", "*", "/"].includes(key)) {
        operand = key;
        console.log(operand);
    }
    if (key === "n") {
        handleNegateButton();
    } else if (key === "Enter") {
        handleEnterButton();
    } else if (key === "c") {
        handleClearButton();
    } else if (key === "Backspace") {
        handleDeleteButton();
    } else {
        handleNumberButton(key);
    }
});



// handle button clicks
function handleNegateButton() {
    console.log("hey, it's time to negate this expression");
    console.log(operand);
    if (values.includes(operand)) {
        console.log("get index of operand");
        const index = values.indexOf(operand);
        console.log(index);
        let postOperandNum = values.splice(index+1, values.length-index).join('');
        console.log(postOperandNum);
        negateNum = negate(postOperandNum);
    } else {
        console.log("nope, operand not in values");
        console.log(values);
        let preOperandNum = values.splice(0).join('');
        negateNum = negate(preOperandNum);
    }
    values.push(negateNum);
    console.log(values)
    displayResult(values.join(""));
}

// return negated number and indicate if it is negative
function negate(num) {
    console.log("hey, it's time to negate");
    if (-num < 0) {
        negated = true;
    } else {
        negated = false;
    }
    return -num;
}

function handleEnterButton() {
    console.log("hey, it's time to evaluate this expression");
    const expr = values.join("");
    let result = 0;

    if (negated) {
        values = [];
        result = handleInput(expr, negated);
        values.push(result);
        console.log(result);
    } else {
        values = [];
        result = handleInput(expr);
        values.push(result);
    }
    values = [];
    values.push(result);
    if (result < 0) {
        negated = true;
    }
}

function handleClearButton() {
    console.log("hey, it's time to clear this expression");
    values = [];
    displayResult("0");
    expression[0].style.color = "#081c15";
}

function handleDeleteButton() {
    console.log("hey, it's time to delete this expression");
    values.pop();
    displayResult(values.join(""));
}

function handleNumberButton(value) {
    const operands = ["+", "-", "*", "/"];
    if (isNaN(value)){
        if (operands.includes(value)){
            values.push(value);
        displayResult(values.join(""));
        }
    } else {
        values.push(value);
        displayResult(values.join(""));
    }
    
}