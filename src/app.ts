import { runSQL } from "./service/sql.service";

(async () => {
  const result = await runSQL(`SELECT TOP (1) * FROM Person.Person`);
  console.log(result);
})();
