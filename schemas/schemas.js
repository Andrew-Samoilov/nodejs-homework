const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
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
