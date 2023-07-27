const { Schema, model } = require('mongoose');
const Joi = require('joi');

const handleMongooseError = require('../helpers/handleMongooseError');

const emailRegex =/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/;;
const subscriptionTypes = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegex,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: subscriptionTypes,
      default: 'starter',
    },
    token: { type: String, default: '' },
    avatarURL: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': 'missing field email',
  }),
  password: Joi.string().required().messages({
    'any.required': 'missing field password',
  }),
  subscription: Joi.string().valid(...subscriptionTypes),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': 'missing field email',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'any.required': 'missing field email',
  }),
  password: Joi.string().required().messages({
    'any.required': 'missing field password',
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionTypes),
});

const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model('user', userSchema);

module.exports = { User, schemas };