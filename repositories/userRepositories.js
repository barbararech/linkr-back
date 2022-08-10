import db from '../database/db.js';

async function getUserByEmail(email) {
  console.log(email);
  return db.query(`SELECT * FROM "users" WHERE email = $1;`, [email]);
}

async function addUser(email, passwordEncrypted, username, pictureUrl) {
  return db.query(
    `INSERT INTO "users" (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4)`,
    [email, passwordEncrypted, username, pictureUrl]
  );
}

export async function getUserPicById(id) {
  return db.query(
    `
  SELECT "pictureUrl"
  FROM users
  WHERE id = $1`,
    [id]
  );
}

export const userRepository = {
  getUserByEmail,
  addUser,
};
