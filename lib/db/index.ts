import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var db: PrismaClient | undefined;
}
// 
const db = global.db || new PrismaClient({log: ["query"]});

if (process.env.NODE_ENV !== "production") global.db = db;

export default db;
process.on("beforeExit", () => {
  console.log("Closing Prisma Client...");
  db.$disconnect();
});

process.on("SIGINT", () => {
  console.log("Caught interrupt signal, disconnecting Prisma Client...");
  db.$disconnect().finally(() => process.exit(0));
});