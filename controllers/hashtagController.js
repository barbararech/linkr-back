import { hashtagRepository } from "../repositories/hashtagRepositories.js";
import { userRepository } from "../repositories/userRepositories.js";

export async function trending(req, res) {
  const { id } = res.locals;
  try {
    const { rows: user } = await userRepository.getUserById(id);

    if (user.length === 0) {
      return res.sendStatus(403);
    }

    const { rows: trending } = await hashtagRepository.getTrending();
    return res.status(200).send(trending);
  } catch (error) {
    return res.status(500).send(error);
  }
}
