import { resolvers, typeDefs } from "./graphql";
import { connectMongo } from "./service/mongo.service";
import { downloadCSV, downloadPDF } from "./service/person.service";
import { port } from "./config"
export let dbClient;

const { ApolloServer } = require("apollo-server-express");
const server = new ApolloServer({ typeDefs, resolvers });
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

server.applyMiddleware({ app, path: `/graphql` });

// app.get("*", (req, res) => {
//   return res.sendFile(path.join(__dirname, "../dist/public/index.html"));
// });

app.post("/download/csv", async (req, res) => {
  const csv = await downloadCSV(req.body);
  res.send(csv);
});

app.post("/download/pdf", async (req, res) => {
  const csv = await downloadPDF(req.body);
  res.send(csv);
});

app.listen({ port }, async () => {
  dbClient = await connectMongo();
});
