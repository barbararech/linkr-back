import db from "../database/db.js";

async function createPost(
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

async function getLikes(postId, userId) {
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

async function countLikes(postId) {
  const likes = await db.query(
    `
    SELECT COUNT(*) FROM likes
    WHERE "postId" = $1    
  `,
    [postId]
  );

  return likes.rows[0].count;
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

async function getPosts() {
  return db.query(`SELECT p.*, u."pictureUrl", u.username FROM posts p
    JOIN users u
    ON p."userId" = u.id
    ORDER BY "createdAt" DESC LIMIT 20`);
}


async function getPostById(id){
  return db.query(`SELECT * FROM posts WHERE id = $1`, [id] )
}
  
async function editPost(id, text){
  db.query(`UPDATE posts SET article = $1 WHERE id = $2`, [text, id])
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

async function deletePost(id){
  db.query(`DELETE FROM posts WHERE id = $1`, [id])
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
   countLikes,
   removePostLikes
};
