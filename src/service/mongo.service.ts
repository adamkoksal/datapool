import { mongoURI } from "../config";
import { MongoClient } from "mongodb";
import { dbClient } from "../app";

export async function connectMongo() {
  try {
    const client = await MongoClient.connect(mongoURI, {
      useUnifiedTopology: true,
    });
    console.log("Connected to mongo");
    return client.db();
  } catch (error) {
    console.log(error);
  }
}

export async function bulkInsert(sqlData: Array<any>) {
  let insertedCount = 0;
  let ops: Array<any> = [];

  console.log("Bulk Insert Starting");

  for await (const data of sqlData) {
    data.StateProvinceCode = data.StateProvinceCode.trim();
    data.EmailAddress = data.EmailAddress.replace("adventure-works", "datapool");
    ops.push({
      insertOne: data,
    });

    if (ops.length == 1000) {
      let { result } = await dbClient
        .collection("Person")
        .bulkWrite(ops, { writeConcern: { w: 1 } });

      insertedCount += result.nInserted;
      ops = [];
    }
  }

  if (ops.length > 0) {
    let { result } = await dbClient
      .collection("Person")
      .bulkWrite(ops, { writeConcern: { w: 1 } });

    insertedCount += result.nInserted;
  }
  console.log(`Bulk Insert completed. Inserted Count: ${insertedCount}`);
}
