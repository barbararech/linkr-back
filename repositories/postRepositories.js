import db from "../database/db.js";

async function getPosts() {

    return db.query(`SELECT p.*, u."pictureUrl", u.username FROM posts p
    JOIN users u
    ON p."userId" = u.id
    ORDER BY "createdAt" DESC LIMIT 20`);
  }


export const postRepository = {
   getPosts
};