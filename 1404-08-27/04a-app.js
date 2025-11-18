import { run, use } from "./04a-framework.js"

use("print", (inputs) => {
    console.log(inputs[0])
})

run();