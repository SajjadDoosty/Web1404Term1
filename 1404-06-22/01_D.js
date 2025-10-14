let inputs = process.argv.slice(3);
let command = process.argv[2];

console.log("command is:", command);
console.log("inputs are:", inputs);

if (command === "sum") {
    console.log(Number(inputs[0]) + Number(inputs[1]))
}
else {
    console.log("command not found.")
}