const { Timestamp } = require('@google-cloud/firestore');
const { TimeModel } = require('../models');

/**
 * TimeRepository
 */
class TimeRepository {
  /**
   * Set a time
   * @param {{ label: string, alarm: string, info: string, accountId: string, amountunit: string, drugName: string }} time
   * @return {Promise<*>}
   */
  static async create({ label, alarm, info, accountId, amountunit, drugName }) {
    const now = Timestamp.now();
    return TimeModel.collection.add({ label, alarm, info, accountId, amountunit, drugName, createdAt: now, updatedAt: now });
  }

  /**
   * Find a time
   * @param {string} accountId
   * @return {Promise<*>}
   */
  static async findByAccountId(accountId) {
    return TimeModel.collection.doc(accountId).get();
  }
}

module.exports = TimeRepository;
