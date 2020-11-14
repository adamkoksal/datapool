import { dbClient } from "../app";

const limit = 10;

export async function getPersons({ fields, page }) {
  for (const prop in fields) {
    if (fields[prop] === "") delete fields[prop];
  }
  let skip = page ? (page - 1) * limit : 0;
  return await dbClient
    .collection("Person")
    .find(fields)
    .collation({ locale: "en", strength: 2 })
    .skip(skip)
    .limit(limit)
    .toArray();
}

export async function getCount({ fields }) {
  for (const prop in fields) {
    if (fields[prop] === "") delete fields[prop];
  }
  return await dbClient
    .collection("Person")
    .find(fields)
    .collation({ locale: "en", strength: 2 })
    .count();
}
