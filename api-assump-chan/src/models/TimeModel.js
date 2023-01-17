/**
 * TimeModel
 */
class TimeModel {
  /**
   * Constructor
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
    this.COLLECTION_NAME = 'Times';
    this.collection = this.db.collection(this.COLLECTION_NAME);
  }
}

module.exports = TimeModel;
