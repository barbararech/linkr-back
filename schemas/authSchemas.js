import joi from "joi";

export const schemas = {
  signUpSchema: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
    username: joi.string().required(),
    pictureUrl: joi.string().required(),
  }),

  signInSchema: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};

// Schema de signup com validação mais forte em breve

// email: joi.string().email().max(200).required(),
// password:joi.string().pattern(/(?=.*?[A-Z])/).pattern(/(?=.*?[a-z])/).pattern(/(?=.*?[0-9])/).pattern(/(?=.*?[#?!@$%^&*-])/).min(8).required(),
// username: joi.string().required().min(3).max(50),
// joi.string().uri().pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/).required()
