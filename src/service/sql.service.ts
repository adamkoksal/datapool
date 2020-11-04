import { sqlURI } from "../config";
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
    const query = getQuery();
    const response = await runSQL(query);

    return response.recordset;
  } catch (error) {
    console.log(error);
  }
}

function getQuery (): string {
    return `query`
}
