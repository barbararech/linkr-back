//import { func } from "joi";
import db from "../database/db.js";

async function createComment(comment, postId, userId) {
  return db.query(
    `
  INSERT INTO comments (comment, "postId", "userId")
  VALUES ($1, $2, $3)
  `,
    [comment, postId, userId]
  );
}

async function createPost(
  link,
  article,
  userId,
  urlTitle,
  urlDescription,
  urlImage
) {
  return db.query(
    `
    INSERT INTO posts (link, article, "userId", "urlTitle", "urlDescription", "urlImage")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
    `,
    [link, article, userId, urlTitle, urlDescription, urlImage]
  );
}

async function getHashtagsByName(name) {
  return db.query(`SELECT * FROM hashtags WHERE name = $1`, [name]);
}
async function createHashtag(name) {
  return db.query(`INSERT INTO hashtags (name) VALUES ($1) RETURNING id`, [
    name,
  ]);
}

async function createPostHashtags(postId, hashtagId) {
  return db.query(
    `INSERT INTO "postHashtag" ("postId", "hashtagId") VALUES ($1, $2)`,
    [postId, hashtagId]
  );
}

async function registerLike(postId, userId) {
  return db.query(
    `INSERT INTO likes ("postId", "userId")
    VALUES ($1, $2)`,
    [postId, userId]
  );
}

async function removeLike(postId, userId) {
  return db.query(
    `
    DELETE FROM likes
    WHERE "postId" = $1 AND "userId" = $2
  `,
    [postId, userId]
  );
}

async function getLikes(postId) {
return db.query(
    `
    SELECT users.username, users.id FROM likes
    JOIN users ON likes."userId" = users.id
    WHERE likes."postId" = $1
  `,
    [postId]
  );
}

async function removePostLikes(postId) {
  return db.query(
    `
        DELETE FROM likes
        WHERE "postId" = $1
    `,
    [postId]
  );
}

async function getPosts(id) {
  return db.query(
    ` SELECT reposts."isRepost", 
    reposts."createdAt",
    reposts."postId" AS id, 
    reposts."userRepostId",
    u2."username" AS "reposterName",
    posts.link, posts.article, 
    posts."userId", 
    posts."urlTitle", 
    posts."urlDescription", 
    posts."urlImage",
    COUNT(r2."postId")::int AS "countReposts",
    u."pictureUrl",
    "followingId"
    FROM posts
    JOIN reposts ON posts.id = reposts."postId"
    JOIN users u ON posts."userId" = u.id
    JOIN users u2 ON reposts."userRepostId" = u2.id
    JOIN following f ON f."followingId" = reposts."userRepostId"
    JOIN reposts r2 ON r2."postId" = posts.id
    WHERE f."userId" = $1
    GROUP BY reposts."isRepost", 
    reposts."createdAt",
    reposts."postId", 
    reposts."userRepostId",
    u2."username",
    posts.link, posts.article, 
    posts."userId", 
    posts."urlTitle", 
    posts."urlDescription", 
    posts."urlImage",
    u."pictureUrl",
    "followingId"
   
   UNION ALL
   
  SELECT COALESCE(reposts."isRepost", FALSE) AS "isRepost",
  p."createdAt", p.id, reposts."userRepostId",
  u.username, p.link, p.article, p."userId", p."urlTitle", p."urlDescription", p."urlImage",
  COUNT(reposts."postId")::int AS "countReposts", 
  u."pictureUrl", "followingId"
      FROM posts p
      JOIN users u ON p."userId" = u.id
      JOIN following f ON f."followingId" = p."userId"
      LEFT JOIN reposts ON p.id = reposts."postId"
      WHERE f."userId" = $1
      GROUP BY reposts."isRepost", p."createdAt", p.id, reposts."userRepostId", u."pictureUrl", u.username, f."followingId"
      ORDER BY "createdAt" DESC LIMIT 10`,
    [id] 
  );
}


async function getPostById(id) {
  return db.query(
    `SELECT posts.*, COUNT(likes.id) AS "postLikes", COUNT("postHashtag".id) AS "hashtags"
  FROM posts
  LEFT JOIN "postHashtag" ON "postHashtag"."postId" = posts.id
  LEFT JOIN likes ON likes."postId" = posts.id
  WHERE posts.id = $1
  GROUP BY posts.id`,
    [id]
  );
}

async function editPost(id, text) {
  db.query(`UPDATE posts SET article = $1 WHERE id = $2`, [text, id]);
}

async function getPostsHashtag(hashtag) {
  return db.query(`  SELECT reposts."isRepost", 
  reposts."createdAt",
  reposts."postId" AS id, 
  reposts."userRepostId",
  u2."username" AS "reposterName",
  posts.link,
  posts.article, 
  posts."userId", 
  posts."urlTitle", 
  posts."urlDescription", 
  posts."urlImage",
  COUNT(r2."postId")::int AS "countReposts",
  u."pictureUrl",
  ht."name" AS "hashtagName"
  FROM posts 
  JOIN reposts ON posts.id = reposts."postId"
  JOIN users u ON posts."userId" = u.id
  JOIN users u2 ON reposts."userRepostId" = u2.id
  JOIN "postHashtag" ph ON ph."postId" = reposts."postId"
  JOIN hashtags ht ON ht.id = ph."hashtagId"
  JOIN reposts r2 ON r2."postId" = posts.id
  WHERE ht."name" = $1
  GROUP BY reposts."isRepost", 
  reposts."createdAt",
  reposts."postId", 
  reposts."userRepostId",
  u2."username",
  posts.link, posts.article, 
  posts."userId", 
  posts."urlTitle", 
  posts."urlDescription", 
  posts."urlImage",
  u."pictureUrl",
  ht."name"
 
 UNION ALL
 
 SELECT COALESCE(reposts."isRepost", FALSE) AS "isRepost",
 p."createdAt", p.id , reposts."userRepostId", u.username, p.link, p.article, p."userId", p."urlTitle", p."urlDescription", p."urlImage" , COUNT(reposts."postId")::int AS "countReposts", u."pictureUrl", ht.name AS "hashtagName"
  FROM posts p
  JOIN users u ON p."userId" = u.id
  JOIN "postHashtag" ph ON ph."postId" = p.id
  JOIN hashtags ht ON ht.id = ph."hashtagId"
  LEFT JOIN reposts ON p.id = reposts."postId"
  WHERE "name" = $1
  GROUP BY reposts."isRepost", p."createdAt", p.id, reposts."userRepostId", u.username, ht.name, u."pictureUrl"
ORDER BY "createdAt" DESC LIMIT 10`, [hashtag]);
}

async function deletePost(id) {
  db.query(`DELETE FROM posts WHERE id = $1`, [id]);
}

async function removePostHashtags(postId) {
  return db.query(
    `
        DELETE FROM "postHashtag"
        WHERE "postId" = $1
    `,
    [postId]
  );
}

async function createRepost(id,postId){
  return db.query(`
  INSERT INTO reposts ("postId", "userRepostId") VALUES ($1, $2)
  `, [postId, id])
}


export const postRepository = {
   getPosts,
   getPostById,
   editPost,
   getPostsHashtag,
   deletePost,
   createPost,
   registerLike,
   removeLike,
   getLikes,
   removePostLikes,
   removePostHashtags,
   createHashtag,
   createPostHashtags,
   getHashtagsByName,
   createComment,
   createRepost,
};
