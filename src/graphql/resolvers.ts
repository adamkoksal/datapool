import { dbClient } from "../app";

export const resolvers = {
  Query: {
    getBooks: async () => await dbClient.collection("Book").find({}).toArray(),
  },
};
