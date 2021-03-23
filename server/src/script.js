const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
    const createLink = await prisma.link.create({
        data: {
            url: "https:howtolearngraphql.com",
            description: "Learning graphql by making a hacker news clone",
        },
    });
    const allLinks = await prisma.link.findMany();
    console.log(allLinks);
};

try {
    main();
} catch (error) {
    throw error;
} finally {
    prisma.$disconnect();
}
