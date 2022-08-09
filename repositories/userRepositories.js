import db from "../database/db.js";

async function getUserByEmail(email) {
  return db.query(`SELECT * FROM public.users WHERE email = $1;`, [email]);
}

export const userRepository = {
  getUserByEmail,
};
