import { getPersons } from "../service/person.service";

export const resolvers = {
  Query: {
    Persons: async (_, args) => getPersons(args),
  },
};
