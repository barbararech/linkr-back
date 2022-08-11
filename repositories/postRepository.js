import db from '../database/db.js';

export async function createPost(link, article, userId) {
  return db.query(
    `
    INSERT INTO posts (link, article, "userId")
    VALUES ($1, $2, $3)
    `,
    [link, article, userId]
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
