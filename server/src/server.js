const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const fs = require("fs");
const prisma = new PrismaClient();
//Resolvers Function
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
//Util Function to fetch the user id from the payload
const { getUserID } = require("./utlis/util");

const resolvers = { Query, Mutation, User, Link };

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    context: async ({ req }) => {
        return {
            ...req,
            prisma,
            userId: req && req.headers.authorization ? await getUserID(req) : null,
        };
    },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
