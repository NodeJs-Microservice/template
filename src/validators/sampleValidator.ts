import { Joi } from '@koa-better-modules/joi-router';

const sampleValidate = Joi.object({
  _id: Joi.string().required()
});

const anotherSampleValidate = Joi.object({
  _id: Joi.string().required()
});

export { sampleValidate, anotherSampleValidate };
