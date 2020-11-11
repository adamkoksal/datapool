import { dbClient } from "../app";

const limit = 10;

export async function getPersons(args) {
  for (const prop in args) {
    if (args[prop] === "") delete args[prop];
  }
  let skip = args.Page ? (args.Page - 1) * limit : 0;
  delete args.Page;
  return await dbClient
    .collection("Person")
    .find(args)
    .collation({ locale: "en", strength: 2 })
    .skip(skip)
    .limit(limit)
    .toArray();
}
