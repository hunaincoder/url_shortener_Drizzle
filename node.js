// const fs = require("fs");
// const path = require("path");

// const filename = "FsAsync\Await.txt";
// const filepath = path.join(__dirname, filename);

// Through callbcack

// const write = fs.writeFile(filepath, "my name is hunain", "utf-8", (err) => {
//     if(err){
//         console.error(err)
//     }else{
//         console.log("file created succesfully")
//     }
// });

// through promisses using async/await
// const WriteFileExample = async () => {
//   try {
//     await fs.promises.writeFile(filepath, "my name is hunain asif ","utf-8");
//     console.log("file created succesfully!");
//   } catch (error) {
//     console.error(error);
//   }
// };

// WriteFileExample();

// const EventEmitter = require("events");

// const emitter = new EventEmitter();

// const emitcounts = {
//   "user-login ": 0,
//   "user-purchase": 0,
//   "profile-update": 0,
//   "user-logout": 0,
// };

// emitter.on("user-login", (args) => {
//   emitcounts["user-login "]++;
//   console.log(` ${args.name} have logged in`);
// });
// emitter.on("user-purchase", (args) => {
//   emitcounts["user-purchase"]++;
//   console.log(`my name is ${args.name} and i have bought a ${args.bought}`);
// });
// emitter.on("profile-update", (args) => {
//   emitcounts["profile-update"]++;
//   console.log(`my name is ${args.name} and i have updated my ${args.updated}`);
// });
// emitter.on("user-logout", (args) => {
//   emitcounts["user-logout"]++;
//   console.log(`${args.name} have logged out`);
// });

// emitter.emit("user-login", { name: "hunain asif" });
// emitter.emit("user-purchase", { name: "hunain asif", bought: "laptop" });
// emitter.emit("profile-update", { name: "hunain asif", updated: "email" });
// emitter.emit("profile-update", { name: "hunain asif", updated: "email" });
// emitter.emit("user-logout", { name: "hunain asif" });

// console.log("final counts", emitcounts);


const http = require("http");
const server = http.createServer((req , res ) => {
    if (req.url === "/" ){
        res.setHeader("Content-Type" , "text/html")
        res.write("<h1> My name is hunain </h1>")
        res.end();
    }    
})  

const port = 3000;

server.listen(port, () => {
    console.log("listening on port " , port)
})


