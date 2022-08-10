import db from '../database/db.js';

export async function createPost(link, article, userId, urlTitle, urlDescription, urlImage) {
  console.log(link)
  return db.query(
    `
    INSERT INTO posts (link, article, "userId", "urlTitle", "urlDescription", "urlImage")
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [link, article, userId, urlTitle, urlDescription, urlImage]
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

