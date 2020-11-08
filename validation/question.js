const Joi = require('joi');

//const isEmpty = require('./is-empty');

const schemas = {
  'open' : 
    Joi.object().keys({
      _id: Joi.string().uuid().required(),
      type: Joi.string().required(),
      text: Joi.string().required(),
      description: Joi.string().allow(''),
    }),
  'multichoice' : 
    Joi.object().keys({
      _id: Joi.string().uuid().required(),
      type: Joi.string().required(),
      text: Joi.string().required(),
      description: Joi.string().allow(''),
      choices: Joi.array().required().items(
        Joi.object().required().keys({
          _id: Joi.string().uuid().required(),
          value: Joi.string().required()
        })
      ),
    })

  };

module.exports = (data) => {
  const schema = schemas[data.type];


  return (schema)
    ? schema.validateAsync(data, {allowUnknown: false, abortEarly:false})
    : Promise.reject(new Error("incorrect question type"))
};
