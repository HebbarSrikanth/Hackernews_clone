const { ApolloServer, PubSub } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const fs = require("fs");
//Creating the required objects
const prisma = new PrismaClient();
const pubsub = new PubSub();
//Resolvers Function
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");
//Util Function to fetch the user id from the payload
const { getUserID } = require("./utlis/util");

const resolvers = { Query, Mutation, Subscription, User, Link, Vote };

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    context: async ({ req }) => {
        return {
            ...req,
            pubsub,
            prisma,
            userId: req && req.headers.authorization ? await getUserID(req) : null,
        };
    },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
