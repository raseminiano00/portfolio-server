const express = require('express');

const aboutMe = require('./content');

const router = express.Router();

router.use('/aboutme', aboutMe);
module.exports = router;
