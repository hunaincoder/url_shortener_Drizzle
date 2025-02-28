import { db } from "./config/db.js";
import { userTable } from "./drizzle/schema.js";

const main = async () => {

//create

//   const user = await db.insert(userTable).values([
//     { name: "hammad", age: 20, email: "hammad@gmail.com" },
//     { name: "moaz", age: 22, email: "moaz@gmail.com" },
//   ]);

// read

// const user = await db.select().from(userTable).where({email : "hunainasif2004@gmail.com"});
//   console.log(user);
// };

// update
// const user = await db.update(userTable).set
// ({ name: "hammad asif" }).where({ email: "hammad@gmail.com" });
//   console.log(user);
// };

//delete 

await db.delete(userTable).where({email: "hammad@gmail.com"})
}

main().catch((err) => {
  console.log(err);
});
