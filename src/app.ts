import { resolvers, typeDefs } from "./graphql";
import { connectMongo } from "./service/mongo.service";
const { ApolloServer } = require("apollo-server");

export let dbClient;
(async () => {
  dbClient = await connectMongo();
})();

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
