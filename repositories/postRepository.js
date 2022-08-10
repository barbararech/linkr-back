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
