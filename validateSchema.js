const Joi = require("joi");
const ExpressError = require("./utils/ExpressError.js");

const listingSchema = Joi.object({
  title: Joi.string().required(),
  description:Joi.string().required(),
  price: Joi.number().min(0).required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  image:Joi.string().allow("",null)
});

function validateListing(req, res, next) {
  const { error } = listingSchema.validate(req.body.list);

  if (error) {
    throw new ExpressError(error.details[0].message, 400);
  } else {
    next();
  }
}

module.exports = validateListing;
