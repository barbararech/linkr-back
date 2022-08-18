import db from "../database/db.js";

async function addUser(email, passwordEncrypted, username, pictureUrl) {
  return db.query(
    `INSERT INTO "users" (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4) RETURNING id`,
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
    `SELECT reposts."isRepost", 
    reposts."createdAt",
    reposts."postId" AS id, 
    reposts."userRepostId",
    u."username" AS username,
    u2."username" AS "reposterName",
    posts.link, posts.article, 
    posts."userId", 
    posts."urlTitle", 
    posts."urlDescription", 
    posts."urlImage",
    COUNT(r2."postId")::int AS "countReposts",
    u."pictureUrl"
    FROM posts
    JOIN reposts ON posts.id = reposts."postId"
    JOIN users u ON posts."userId" = u.id
    JOIN users u2 ON reposts."userRepostId" = u2.id
    JOIN reposts r2 ON r2."postId" = posts.id
    WHERE reposts."userRepostId" = $1
    GROUP BY reposts."isRepost", 
    reposts."createdAt",
    reposts."postId", 
    reposts."userRepostId",
    u."username",
    u2."username",
    posts.link, posts.article, 
    posts."userId", 
    posts."urlTitle", 
    posts."urlDescription", 
    posts."urlImage",
    u."pictureUrl"
  UNION ALL
    
   SELECT COALESCE(reposts."isRepost", FALSE) AS "isRepost", p."createdAt", p.id, reposts."userRepostId", u.username, u2.username, p.link, 
   p.article, p."userId", p."urlTitle", p."urlDescription", p."urlImage",
  COUNT(reposts."postId")::int AS "countReposts", u."pictureUrl"
      FROM posts p
        JOIN users u ON p."userId" = u.id
        LEFT JOIN reposts ON p.id = reposts."postId"
        JOIN users u2 ON reposts."userRepostId" = u2.id
        WHERE u.id = $1
         GROUP BY p.id, u."pictureUrl", u.username, u2.username, reposts."isRepost", reposts."userRepostId"
    ORDER BY "createdAt" DESC LIMIT 10`,
    [id]
  );
}

async function getUserNameById(id) {
  return db.query(`SELECT username FROM users WHERE id=$1`, [id]);
}

async function getUsersBySearch(username, id) {
  return db.query(
    ` SELECT following.*, users.*
  FROM users 
  FULL OUTER JOIN following 
  ON "followingId" = users.id
  WHERE username ILIKE $1
  ORDER BY "userId"=$2 AND "userId" IS NOT NULL DESC `,
    [`${username}%`, id]
  );
}

async function getFollowingUser(userId, followingUserId) {
  return db.query(
    `SELECT * FROM following WHERE "userId"=$1 AND "followingId" = $2`,
    [userId, followingUserId]
  );
}

async function getFollowingUsers(userId, followingUserId) {
  return db.query(`SELECT * FROM following WHERE "userId"=$1`, [userId]);
}

async function postFollowUser(userId, followingUserId) {
  console.log(userId);
  console.log(followingUserId);

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
  getFollowingUsers,
  postFollowUser,
  postUnfollowUser,
};
