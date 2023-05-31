const { Schema, model } = require('mongoose');
const { mongooseError } = require('../helpers');
const Joi = require('joi');

const updateFavoriteShema = Joi.object({ favorite: Joi.bool() });

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
}, {
  versionKey: false,
});

contactSchema.post("save", mongooseError);
const schemas = { updateFavoriteShema };;
const Contact = model('Contact', contactSchema);
module.exports = { Contact, schemas };
