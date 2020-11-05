import { sqlURI, sqlQuery } from "../config";
const sql = require("mssql");
// remove export
export async function runSQL(query: string) {
  try {
    await sql.connect(sqlURI);
    return sql.query(query);
  } catch (e) {
    console.error(`SQL Query failed: ${query}`);
    console.error(e);
  }
}

export async function runSQLQuery() {
  try {
    const response = await runSQL(sqlQuery);

    return response.recordset;
  } catch (error) {
    console.log(error);
  }
}
