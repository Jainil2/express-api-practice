import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { usersTable } from "../../../db/schema/users.js";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL || '');

export async function createUser(user) {
  await db.insert(usersTable).values(user);
}

export async function readUsers() {
  return await db.select().from(usersTable);
}

export async function updateUser(user) {
  await db.update(usersTable).set(user).where(eq(usersTable.email, user.email));
}

export async function deleteUser(email) {
  await db.delete(usersTable).where(eq(usersTable.email, email));
}