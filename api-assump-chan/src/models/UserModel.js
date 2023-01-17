/**
 * UserModel
 */
class UserModel {
  /**
   * Constructor
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
    this.COLLECTION_NAME = 'Users';
    this.collection = this.db.collection(this.COLLECTION_NAME);
  }
}

module.exports = UserModel;
