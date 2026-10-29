import fs from "fs/promises";
import path from "path";

const file = path.join(process.cwd(), "database", "data.json");
let queue: Promise<unknown> = Promise.resolve();
export async function readDb(): Promise<any> {
  const json = JSON.parse(await fs.readFile(file, "utf8"));
  if (!Array.isArray(json.user)) json.user = [];
  return json;
}
export function updateDb<T>(fn: (db: any) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const db = await readDb();
    const result = await fn(db);
    const tmp = file + ".tmp";
    await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
    await fs.rename(tmp, file);
    return result;
  });
  queue = run.catch(() => {});
  return run;
}