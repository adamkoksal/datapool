import { dbClient } from "../app";

const limit = 5;

export async function getPersons(args) {
  let skip = args.Page ? (args.Page - 1) * limit : 0;
  delete args.Page;
  return await dbClient
    .collection("Person")
    .find(args)
    .skip(skip)
    .limit(limit)
    .toArray();
}
