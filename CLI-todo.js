import readline from "readline"

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});


const todos = []

const showmenu = () => {
    console.log("1. add a task")
    console.log("2. show all tasks")
    console.log("3. exit")
    rl.question("choose an option : ", handleInput)
}


const handleInput = (option) => {
    if(option === "1"){
        rl.question("enter a task " , (task) =>{
            todos.push(task);
            console.log("Task added : " ,task)
            showmenu()
        })
    }else if (option === "2") {
        todos.forEach((task , index) => {
            console.log(`${index+1} : ${task}`)
        })
        showmenu()
    }else if (option === "3"){
        console.log("good Byee")
        rl.close()
    }else {
        console.log("invalid input ")
        showmenu()
    }
}

showmenu()