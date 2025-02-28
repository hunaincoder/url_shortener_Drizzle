import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  const user = await prisma.user.createMany({
    data: [
      {
        name: "ahmed",
        email: "ahmed@gmail.com",
      },
      {
        name : "moaz",
        email :"moaz@gmail.com"
      }
    ],
  });
  console.log(user);
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect;
  });
