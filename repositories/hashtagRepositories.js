import db from "../database/db.js";

async function getTrending() {
  return db.query(`SELECT 
      hashtags."name" AS hashtag,
      COUNT("hashtagId") AS "hashtagUsage"
    FROM hashtags
    JOIN "postHashtag" 
    ON hashtags.id = "postHashtag"."hashtagId"
    GROUP BY "hashtag"
    ORDER BY "hashtagUsage" DESC;`);
}

export const hashtagRepository = {
  getTrending,
};
