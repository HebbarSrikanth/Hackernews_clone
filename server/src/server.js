const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const fs = require("fs");
const prisma = new PrismaClient();

const resolvers = {
    Query: {
        info: () => `This is a graphql API`,
        feed: (parent, args, context) => {
            return context.prisma.link.findMany();
        },
    },
    Mutation: {
        post: async (parent, args, context) => {
            const newLink = await context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                },
            });
            return newLink;
        },
        update: (parent, args) => {
            let link = links.find((val) => val.id === args.id);
            if (link) {
                link.description = args.description;
                link.url = args.url;
                links.push(link);
                return link;
            }
        },
        delete: (parent, args) => {
            let link = links.find((val) => val.id === args.id);
            if (link) {
                links = links.filter((val) => val.id !== args.id);
                return link;
            } else return null;
        },
    },
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    context: { prisma },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
