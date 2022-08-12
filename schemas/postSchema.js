import joi from 'joi';

const postSchema = joi.object({
  text: joi.string().required()
});

export default postSchema;