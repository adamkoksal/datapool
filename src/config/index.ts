require("dotenv").config();

export const mongoURI = `${'' || process.env.MONGO_URI}`;
export const sqlURI = process.env.SQL_URI;
export const port = process.env.PORT || 4000;

export * from "./sql.query";
