import { runSQLQuery } from "./service/sql.service";

(async () => {
  const result = await runSQLQuery();
  console.log(result);
})();
