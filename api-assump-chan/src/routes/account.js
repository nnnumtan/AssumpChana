const express = require('express');
const accountController = require('../controllers/AccountController');
const { validateSchema } = require('../middlewares/validateSchema');

const router = express.Router();

router.post('/accounts/create',
  validateSchema(accountController.createAccountValidations),
  accountController.createAccount)

module.exports = router;
