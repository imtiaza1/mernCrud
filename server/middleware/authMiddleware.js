const joi = require("joi");

const inputValidation = (req, res, next) => {
	const schema = joi.object({
		name: joi.string().min(3).max(30).required(),
		email: joi.string().email().required(),
		password: joi.string().min(4).max(30).required(),
	});
	const { error } = schema.validate(req.body);
	if (error) {
		return res
			.status(400)
			.json({ message: error.details[0].message, success: false });
	}
	next();
};
module.exports = inputValidation;
