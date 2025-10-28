const fs = require('fs')

const inputs = process.argv.slice(3);
const command = process.argv[2];
const filePath = './files/data.json'

let result

if (command === "sum") {
    const a = Number(inputs[0])
    const b = Number(inputs[1])

    result = sum(a, b)
}
else if (command === "minus") {
    const a = Number(inputs[0])
    const b = Number(inputs[1])

    result = minus(a, b)
}
else if (command === "multiply") {
    const a = Number(inputs[0])
    const b = Number(inputs[1])

    result = multiply(a, b)
}
else if (command === "division") {
    const a = Number(inputs[0])
    const b = Number(inputs[1])

    result = division(a, b)
}
else if (command == "write") {
    const name = inputs[0]

    if (name === undefined) {
        result = "parameter [1] can't be empty."
    }
    else {
        fs.writeFile(filePath, JSON.stringify({ name: name }), function (error) {
            if (error) {
                console.log('error in saved file.')
            }
            else {
                console.log('file saved.')
            }
        })
    }
}
else if (command == "read") {
    fs.readFile(filePath, "utf8", function (error, data) {
        if (error) {
            console.log('error in read file.')
        }
        else {
            console.log('file read:', data)
        }
    })
}
else if (command == "create") {
    const data = readData()

    data.push({
        name: inputs[0],
        age: inputs[1],
        email: inputs[2],
    })

    writeData(data)

    result = '- new record added.'
}
else if (command == "update") {
    const data = readData()

    for (let i = 0; i < data.length; i++) {
        if (data[i].name === inputs[0]) {
            data[i] = {
                name: inputs[1],
                age: inputs[2],
                email: inputs[3],
            }

            writeData(data)
            console.log('- record updated.')
            return
        }
    }

    result = '- not found to update'
}
else {
    console.log("command not found.")
}

if (result !== undefined) {
    console.log(result);
}


function readData() {
    const data = fs.readFileSync(filePath, "utf8")
    return JSON.parse(data)
}
function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data))
}


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