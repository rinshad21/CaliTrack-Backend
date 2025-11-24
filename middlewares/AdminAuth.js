const joi = require("joi");

const adminValidation = (req, res, next) => {
  const schema = joi.object({
    username: joi.string().min(3).max(100).required(),
    password: joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad request", error });
  }
  next();
};

module.exports = {
  adminValidation,
};
