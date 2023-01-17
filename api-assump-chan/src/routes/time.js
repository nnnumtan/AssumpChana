const express = require('express');
const timeController = require('../controllers/TimeController');
const { validateSchema } = require('../middlewares/validateSchema');

const router = express.Router();

router.post('/time/create',
  validateSchema(timeController.setTimeValidations),
  timeController.setTime)

module.exports = router;
