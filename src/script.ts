import { title } from "node:process";
import { prisma } from "./lib/prisma";

async function main() {
  //? Create a new user with a post
  // const user = await prisma.user.create({
  //     data: {
  //         name: "mjh 2",
  //         email: "mjh@mial2.com",
  //         posts: {
  //             create: {
  //                 title: "second post ",
  //                 content: "this is the second post!",
  //                 published: true,
  //             }
  //         }
  //     },
  //     include: {
  //         posts: true,
  //     }
  // })

  // ? create a new post
  const post = await prisma.post.create({
    data: {
      authorId: 1,
      title: "id 1's post",
      content: "this is a new post!",
      published: true,
    },
  });

  console.log("Created user:", post);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
