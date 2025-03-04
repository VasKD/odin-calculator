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
    let quotient = (num1) / (num2);
    return num2 !== 0 ? quotient.toPrecision(2) : alert("Error: Division by zero");
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


// Event listeners for buttons
let display = document.getElementsByClassName("result");
let expression = document.getElementsByClassName("expression");
const buttons = document.querySelectorAll("button");
let values = [];


function handleInput(input, negated = null) {
    if (negated) {
        console.log("hello! this expression is negated");
        input = input.split(/(-?\d+\.\d+|-?\d+|\D)/).filter(num => num !== "");
        console.log(input);
    } else {
        input = input.split(/(\d+\.\d+|\d+|\D)/).filter(num => num !== "");
        console.log(input);
    }
    

    let num1 = Number(input[0]);
    let operator = input[1];
    let num2 = Number(input[2]);

    let result = operate(num1, operator, num2);
    display[0].textContent = result;

    expression[0].textContent = `${num1} ${operator} ${num2} =`;
    expression[0].style.color = "grey";

    return result;
}

let negated = false;
let operand = "";



function handleNegate(num) {
    console.log("hey, it's time to negate");
    if (-num < 0) {
        negated = true; 
    } else {
        negated = false;
    }
    console.log(num);
    return -num;
}


buttons.forEach(button => {
    button.addEventListener("click", function() {
        const value = button.getAttribute('data-value');
        let result = 0;
        let negateNum = 0;
        if (['+', "-", "*", "/"].includes(value)) {
            operand = value;
            console.log(operand);
        }
        if (value === "negate") {
            console.log("hey, it's time to negate this expression");
            console.log(operand);
            if (values.includes(operand)) {
                console.log("get index of operand");
                const index = values.indexOf(operand);
                console.log(index);
                let postOperandNum = values.splice(index+1, values.length-index).join('');
                console.log(postOperandNum);
                negateNum = handleNegate(postOperandNum);
            } else {
                console.log("nope, operand not in values");
                console.log(values);
                let preOperandNum = values.splice(0).join('');
                negateNum = handleNegate(preOperandNum);

            }
            values.push(negateNum);
            console.log(values)
            display[0].textContent = values.join("");
        } else if (value === "enter") {
            console.log("hey, it's time to evaluate this expression");
            const str = values.join("");
            if (negated) {
                values = [];
                result = handleInput(str, negated);
                values.push(result);
                console.log(result);
            } else {
                values = [];
                result = handleInput(str);
                values.push(result);
            }
            console.log(result);
        } else if (value === "clear") {
            values = [];
            console.log("hey, it's time to clear this expression");
            display[0].textContent = "0";
            expression[0].style.color = "#081c15";
        } else if (value === "delete") {
            values.pop();
            display[0].textContent = values.join("");
        } else {
            values.push(value);
            display[0].textContent = values.join("");
        }
        console.log(values);
        console.log(negated);
    });
});