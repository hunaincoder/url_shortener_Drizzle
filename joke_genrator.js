import https from 'https';
import chalk from 'chalk';

const getjoke =() =>{
    const url = "https://official-joke-api.appspot.com/random_joke"

    https.get(url , (response) => {
        let data = ""
        response.on("data" , (chunk) => {
            data += chunk
        })
        response.on("end" , () => {
            const joke = JSON.parse(data)
            console.log(`here is a ${joke.type} joke`)
            console.log(chalk.green(joke.setup))
            console.log(chalk.red(joke.punchline))

        })
        response.on("error" , (err) => {
            console.log(err.message)
        })
    })
}

getjoke()