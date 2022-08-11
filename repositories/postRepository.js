import db from "../database/db.js";

export async function createPost(
  link,
  article,
  userId,
  urlTitle,
  urlDescription,
  urlImage
) {
  console.log(link);
  return db.query(
    `
    INSERT INTO posts (link, article, "userId", "urlTitle", "urlDescription", "urlImage")
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [link, article, userId, urlTitle, urlDescription, urlImage]
  );
}

export async function registerLike(postId, userId) {
  return db.query(
    `INSERT INTO likes ("postId", "userId")
    VALUES ($1, $2)`,
    [postId, userId]
  );
}

export async function removeLike(postId, userId) {
  return db.query(
    `
    DELETE FROM likes
    WHERE "postId" = $1 AND "userId" = $2
  `,
    [postId, userId]
  );
}

export async function getLikes(postId, userId) {
  const userLiked = await db.query(
    `
    SELECT users.username FROM likes
    JOIN users ON likes."userId" = users.id
    WHERE likes."postId" = $1 AND likes."userId" = $2
  `,
    [postId, userId]
  );

  const allLikes = await db.query(
    `
    SELECT users.username FROM likes
    JOIN users ON likes."userId" = users.id
    WHERE "postId" = $1 AND "userId" != $2
    ORDER BY likes.id DESC
    LIMIT 2
  `,
    [postId, userId]
  );

  return { userLiked, allLikes };
}

export async function countLikes(postId) {
  const likes = await db.query(
    `
    SELECT COUNT(*) FROM likes
    WHERE "postId" = $1    
  `,
    [postId]
  );

  return likes.rows[0].count;
}

export async function removePostLikes(postId) {
  return db.query(
    `
        DELETE FROM likes
        WHERE "postId" = $1
    `,
    [postId]
  );
}

async function getPosts() {
  return db.query(`SELECT p.*, u."pictureUrl", u.username FROM posts p
    JOIN users u
    ON p."userId" = u.id
    ORDER BY "createdAt" DESC LIMIT 20`);
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

export const postRepository = {
  getPosts,
  getPostsHashtag,
};
