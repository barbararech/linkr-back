import joi from 'joi';

const linkSchema = joi.object({
  link: joi
    .string()
    .required()
    .pattern(/^[(http(s)?):\/\/(www\.)]/),
  article: joi.string(),
});

export default linkSchema;
