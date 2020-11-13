import { getPersons, getCount } from "../service/person.service";

export const resolvers = {
  Query: {
    persons: async (_, args) => getPersons(args),
    getCount: async (_, args) => getCount(args),
  },
};
