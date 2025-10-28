const inputs = process.argv.slice(3);
const command = process.argv[2];

const a = Number(inputs[0])
const b = Number(inputs[1])

let result

if (command === "sum") {
    result = sum(a, b)
}
else if (command === "minus") {
    result = minus(a, b)
}
else if (command === "multiply") {
    result = multiply(a, b)
}
else if (command === "division") {
    result = division(a, b)
}
else {
    console.log("command not found.")
}

console.log(result);


function sum(a, b) {
    return a + b
}

function minus(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function division(a, b) {
    return a / b
}