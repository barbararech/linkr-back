import db from "../database/db.js";

async function addUser(email, passwordEncrypted, username, pictureUrl) {
  return db.query(
    `INSERT INTO "users" (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4)`,
    [email, passwordEncrypted, username, pictureUrl]
  );
}

async function getAllUsers() {
  return db.query(`SELECT * FROM users `);
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

async function getPostsbyUser(id) {
  return db.query(
    `SELECT p.*, u."pictureUrl", u.username FROM posts p
  JOIN users u
  ON p."userId" = u.id
  WHERE u.id = $1
  ORDER BY "createdAt" DESC LIMIT 20`,
    [id]
  );
}

async function getUserNameById(id) {
  return db.query(`SELECT username FROM users WHERE id=$1`, [id]);
}

async function getUsersBySearch(username) {
  return db.query(` SELECT * FROM users WHERE username ILIKE $1 `, [
    `${username}%`,
  ]);
}

async function getFollowingUser(userId, followingUserId) {
  return db.query(
    `SELECT * FROM following WHERE "userId"=$1 AND "followingId" = $2`,
    [userId, followingUserId]
  );
}

async function postFollowUser(userId, followingUserId) {
  console.log(userId)
  console.log(followingUserId)
  
  return db.query(
    `INSERT INTO "following" ("userId", "followingId") VALUES ($1, $2)`,
    [userId, followingUserId]
  );
}

async function postUnfollowUser(userId, followingUserId) {
  return db.query(
    `DELETE FROM "following" WHERE "userId" = $1 AND "followingId" = $2`,
    [userId, followingUserId]
  );
}

export const userRepository = {
  addUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserPicById,
  getPostsbyUser,
  getUserNameById,
  getUsersBySearch,
  getFollowingUser,
  postFollowUser,
  postUnfollowUser,
};
