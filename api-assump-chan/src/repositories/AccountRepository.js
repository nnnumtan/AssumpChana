const { Timestamp } = require('@google-cloud/firestore');
const { UserModel } = require('../models');
const {raw} = require("express");
const axios = require("axios");

/**
 * Account Repository
 */
class AccountRepository {
  /**
   * Create a account
   * @param @param {{ uid: string, email: string, nickname: string, name: string, address: string, lineToken: string }} user
   * @return {Promise<*>}
   */
  static async create({ uid, email, nickname, name, address, lineToken }) {
    const now = Timestamp.now();
    return UserModel.collection.add({ uid, email, nickname, name, address, lineToken, createdAt: now, updatedAt: now });
  }

  /**
   * Find account by accountId
   * @param {string} accountId
   * @returns {Promise<*>}
   */
  static async findByAccountId(accountId) {
    const query = UserModel.collection.where('uid', '==', accountId);
    const snapshot = await query.get();

    const [doc] = snapshot.docs;
    return { ...doc.data() }
  }
}

module.exports = AccountRepository;
