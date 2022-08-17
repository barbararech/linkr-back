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
    `SELECT p.*, u."pictureUrl", u.username, "followingId"
	  FROM posts p
    JOIN users u
    ON p."userId" = u.id
	  JOIN following f
	  ON f."followingId" = p."userId"
	  WHERE f."userId" = $1
    ORDER BY "createdAt" `,
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
  return db.query(`SELECT p.*, u."pictureUrl", u.username, 
    ht.name AS "hashtagName"
      FROM posts p
        JOIN users u
        ON p."userId" = u.id
        JOIN "postHashtag" ph
        ON ph."postId" = p.id
      JOIN hashtags ht
        ON ht.id = ph."hashtagId"
      WHERE "name" = '${hashtag}'
        ORDER BY "createdAt" DESC LIMIT 20`);
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
};
