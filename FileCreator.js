import fs from "fs"
import readline from "readline"



const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

const filecreation = () => {
    rl.question("what should be the name of the file : " , (fname) =>{
        rl.question("what do you to write in a file : " , (content) => {
            fs.writeFile(`${fname}.txt ` , content , "utf-8" , (err) => {
                if(err){
                console.error(err)
            }else{
                console.log("file created succesfully")
            }
            rl.close()
            })
        }) 
    })
}


filecreation()






