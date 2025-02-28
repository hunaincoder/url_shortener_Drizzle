import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hunain@12",
  database: "mydb",
});

console.log("databse connected");

// await db.execute("create database mydb")
// console.log( await db.execute("show databases"));

//create

// await db.execute("create table users (id int, name varchar(255), email varchar(255))");
// console.log("table created");


//insert


// await db.execute(`insert into users (name ,email ) values ("hunain" , "hunain@gmail.com") `);
// console.log("data inserted");

// await db.execute(`insert into users (name ,email ) values (? , ?) ` , ["hunain" , "hunain@gmail.com"]);
// console.log("data inserted");

// const data = [
//     ["hamad" , "hamad@gmail.com"],
//     ["moaz" , "moaz@gmail.com"],
//     ["irtiza" , "irtiza@gmail.com"],
//     ["huzaifa" , "huzaifa@gmail.com"]
// ]

// await db.query(`insert into users (name ,email ) values ? ` , [data]);
// console.log("data inserted");


// read


// const rows = await db.execute("select * from users");
// console.log(rows);


//show


const [rows] = await db.execute("select * from users");
console.log(rows);
