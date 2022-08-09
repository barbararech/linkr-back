import db from "../database/db.js";

async function getUserByEmail(email) {
  console.log(email);
  return db.query(`SELECT * FROM "public.users" WHERE email = $1;`, [email]);
}

async function addUser(email, passwordEncrypted, username, pictureUrl) {
  return db.query(
    `INSERT INTO "public.users" (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4)`,
    [email, passwordEncrypted, username, pictureUrl]
  );
}

export const userRepository = {
  getUserByEmail,
  addUser,
};
