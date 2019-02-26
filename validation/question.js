const Joi = require('joi');

//const isEmpty = require('./is-empty');

const schemas = {
  'open' : 
    Joi.object().keys({
      _id: Joi.string().uuid().required(),
      type: Joi.string().required(),
      text: Joi.string().required(),
      description: Joi.string(),
    }),
  'multichoice' : 
    Joi.object().keys({
      _id: Joi.string().uuid().required(),
      type: Joi.string().required(),
      text: Joi.string().required(),
      description: Joi.string(),
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
  if (!schema) reject("incorrect question type")

  return new Promise(function(resolve, reject) {
    Joi.validate(data, schema, {allowUnknown: false, abortEarly:false}, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
