require("dotenv").config();

export const mongoURI = process.env.MONGO_URI;
export const sqlURI = process.env.SQL_URI;

export * from "./sql.query";
