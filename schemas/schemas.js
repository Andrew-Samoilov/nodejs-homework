const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(30)
        .required(),
    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phone: Joi
        .string()
        .regex(/^[0-9]{10}$/)
        .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
        .required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const sсhemas = {
    addSchema,
    updateFavoriteSchema,
};

module.exports = { sсhemas, updateFavoriteSchema };
