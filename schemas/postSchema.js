import joi from 'joi';

const postSchema = joi.object({
  text: joi.string().required()
});

const createPostSchema = joi.object({
  text: joi.any(),
  url: joi.string().uri().required()
})

const commentSchema = joi.object({
  comment: joi.string().required()
})

export {postSchema, createPostSchema, commentSchema};