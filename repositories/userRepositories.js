import db from "../database/db.js";

async function addUser(email, passwordEncrypted, username, pictureUrl) {
  return db.query(
    `INSERT INTO "users" (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4)`,
    [email, passwordEncrypted, username, pictureUrl]
  );
}

async function getAllUsers() {
  return db.query(`SELECT * FROM "users"`);
}

async function getUserByEmail(email) {
  return db.query(`SELECT * FROM "users" WHERE email = $1;`, [email]);
}

async function getUserById(id) {
  return db.query(`SELECT * FROM "users" WHERE id = $1;`, [id]);
}

async function getUserPicById(id) {
  return db.query(
    `
  SELECT "pictureUrl"
  FROM users
  WHERE id = $1`,
    [id]
  );
}

export const userRepository = {
  addUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserPicById,
};
