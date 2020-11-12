import { getPersons } from "../service/person.service";

export const resolvers = {
  Query: {
    persons: async (_, args) => getPersons(args),
  },
};
