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

async function getPosts() {

    return db.query(`SELECT p.*, u."pictureUrl", u.username FROM posts p
    JOIN users u
    ON p."userId" = u.id
    ORDER BY "createdAt" DESC LIMIT 20`);
  }


export const postRepository = {
   getPosts
};

