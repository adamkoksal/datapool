import { resolvers, typeDefs } from "./graphql";
import { connectMongo } from "./service/mongo.service";
export let dbClient;

const { ApolloServer } = require("apollo-server-express");
const server = new ApolloServer({ typeDefs, resolvers });
const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "../dist/public")));

server.applyMiddleware({ app, path: `/graphql` });

// app.get("*", (req, res) => {
//   return res.sendFile(path.join(__dirname, "../dist/public/index.html"));
// });

app.listen({ port: 4000 }, async () => {
  dbClient = await connectMongo();
});
