const express = require('express');
const monk = require('monk');
const joi = require('@hapi/joi');
const router = express.Router();

const db = monk(process.env.MONGGO_URI);

const contents = db.get('contents');

const contentsSchema = joi.object({
  type: joi.string().external(
    async (value) => {
      const isExists = await isContentTypeExists(value);
      if(isExists){
        throw "Type is already exists";
      }
    }).trim().required(),
  contentValue: joi.string().trim().required()
});

router.get('/', async (req, res, next) => {
  try {
    const items = await contents.find({});
    res.json(items);
  }
  catch (e) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const valueToPost = await contentsSchema.validateAsync(req.body);
    contents.insert(valueToPost);
    res.json(valueToPost);
  }
  catch (e) {
    next(e);
  }
});

router.get('/find', async (req, res, next) => {
  try {
    const type = req.query.type;
    const retrievedContent = await contents.findOne({
      type: type
    });

    if(!retrievedContent) {
      return next();
    }
    
    res.json(retrievedContent);
  }
  catch (e) {
    next(e);
  }
});


async function isContentTypeExists(contentType) {
  try {
    
  const hasFound = await contents.findOne({
    type : contentType
  });

  if( hasFound ) {
    return true;
  }

  return false;
  }
  catch (error){

  }
};

module.exports = router;
