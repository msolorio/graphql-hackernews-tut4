const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const newLink = await prisma.link.create({
      data: {
        url: 'howtographql.com',
        description: 'tuts for geeks'
      }
    });

    const allLinks = await prisma.link.findMany();
  
    console.log(allLinks);
  
    await prisma.$disconnect();
  } catch (err) {
    console.log(err);
  }
}

main();