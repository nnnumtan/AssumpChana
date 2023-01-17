const joi = require('joi');
const logger = require('../../utils/logger')('CreateAccountUseCase');

/**
 * CreateAccountUseCase
 */
class CreateAccountUseCase {
  /**
   * Constructor
   * @param AccountService
   * @param repositories
   */
  constructor({ AccountService }, repositories) {
    this.AccountService = AccountService;
    this.repositories = repositories;
  }

  /**
   * validators
   */
  static getValidators = joi.object({
    uid: joi.string().required(),
    email: joi.string().required(),
    nickname: joi.string().required(),
    name: joi.string().required(),
    address: joi.array().required(),
    lineToken: joi.string().required(),
  });

  /**
   * Execute UseCase
   */
  async execute({ uid, email, nickname, name, address, lineToken }) {
    const accountService = new this.AccountService(this.repositories);
    await accountService.createAccount({ uid, email, nickname, name, address: address.join(' '), lineToken });

    logger.info(`Successfully created account  uid=${uid} email=${email}`, { uid, email, nickname, name, address: address.join(' '), lineToken })

    return { message: 'Successfully created account' };
  }
}

module.exports = CreateAccountUseCase;
