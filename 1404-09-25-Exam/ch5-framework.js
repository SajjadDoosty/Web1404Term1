let command = process.argv[2]
let inputs = process.argv.slice(3)

let controllers = []

function run() {
    let found = false

    for (let constroller of controllers) {
        if (constroller.command === command) {
            constroller.func(inputs)
            found = true
        }
    }

    if (found === false) {
        console.log("command not found.")
    }
}

function use(command, func) {
    controllers.push({
        command: command,
        func: func
    })
}


export {
    run,
    use
}