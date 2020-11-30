import { dbClient } from "../app";

const limit = 10;

export async function getPersons({ fields, page }) {
  fields = transformProps(fields);
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
  fields = transformProps(fields);
  return await dbClient
    .collection("Person")
    .find(fields)
    .collation({ locale: "en", strength: 2 })
    .count();
}

function transformProps(fields) {
  for (const prop in fields) {
    if (fields[prop][0] === "/")
      fields[prop] = { $regex: fields[prop].slice(1), $options: "i" };
    if (fields[prop] === "") delete fields[prop];
  }
  return fields;
}
