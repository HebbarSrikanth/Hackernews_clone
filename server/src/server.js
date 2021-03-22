const { ApolloServer } = require("apollo-server");
const path = require("path");
const fs = require("fs");

let links = [
    {
        id: `Link-1`,
        url: "https://howtolearngraphql.com",
        description: "Learn how to full stack using the Graphql",
    },
];

let idLength = links.length;
const resolvers = {
    Query: {
        info: () => `This is a graphql API`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            let po = {
                id: `Link-${++idLength}`,
                url: args.url,
                description: args.description,
            };
            links.push(po);
            return po;
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
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
