const logger = require('../utils/logger')('TimeService');

/**
 * TimeService
 */
class TimeService {
  /**
   * Constructor
   * @param {object} repositories
   */
  constructor({ TimeRepository }) {
    this.TimeRepository = TimeRepository;
  }

  /**
   * Set Time
   * @param {{ label: string, alarm: string, info: string, accountId: string, amountunit: string, drugName: string }} time;
   * @returns {Promise<*>}
   */
  async setTime({ label, alarm, info, accountId, amountunit, drugName }) {

    await this.TimeRepository.create({ label, alarm, info, accountId, amountunit, drugName });

    logger.debug(`Successfully set time of account uid=${accountId}`, { label, alarm, info, accountId, amountunit, drugName });

    return true;
  }

    /**
   * Find time by account id
   * @param {string} accountId
   * @returns {Promise<*>}
   */
  async findTimeByAccountId(accountId) {

    const time = await this.TimeRepository.findByAccountId(accountId);

    logger.debug(`Successfully find time of account uid=${accountId}`, { accountId, time });

    return time;
  }
}

module.exports = TimeService;
