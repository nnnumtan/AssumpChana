const logger = require('../utils/logger')('AccountService');

/**
 * AccountService
 */
class AccountService {
  /**
   * Constructor
   * @param {object} repositories
   */
  constructor({ AccountRepository }) {
    this.AccountRepository = AccountRepository;
  }

  /**
   * Create account
   * @param {{ uid: string, email: string, nickname: string, name: string, address: string, lineToken: string }} user
   * @returns {Promise<boolean>}
   */
  async createAccount({ uid, email, nickname, name, address, lineToken }) {

    await this.AccountRepository.create({ uid, email, nickname, name, address, lineToken });

    logger.debug(`Successfully created account uid=${uid} email=${email}`, { uid, email, nickname, name, address, lineToken });

    return true;
  }

  /**
   * Find account by accountId
   * @param {string} accountId
   * @returns {Promise<*>}
   */
  async findByAccountId(accountId) {
    const account = await this.AccountRepository.findByAccountId(accountId);

    logger.debug(`Successfully find account uid=${accountId}`, { accountId, ...account });

    return account;
  }
}

module.exports = AccountService;
