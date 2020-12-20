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

export async function downloadCSV({ fields, fieldsShown }) {
  const data = await getData(fields);
  const csvRows: string[] = [];
  let headers = Object.keys(data[0]);

  if (fieldsShown)
    headers = fieldsShown;

  csvRows.push(headers.join(","))

  for (const row of data) {
    const values = headers.map(header => { return row[header] })
    csvRows.push(values.join(","))
  }
  const csvData = csvRows.join("\n");
  return { data: csvData };
}

export async function downloadPDF({ fields, fieldsShown }) {
  const data = await getData(fields);
  const csvRows: any[] = [];
  let headers = Object.keys(data[0]);

  if (fieldsShown)
    headers = fieldsShown;
  csvRows.push(headers);

  for (const row of data) {
    const values = headers.map(header => { return row[header] })
    csvRows.push(values)
  }
  return { data: csvRows };
}

async function getData(fields) {
  fields = transformProps(fields);
  const data = await dbClient
    .collection("Person")
    .find(fields)
    .collation({ locale: "en", strength: 2 })
    .toArray();
  return data;
}

