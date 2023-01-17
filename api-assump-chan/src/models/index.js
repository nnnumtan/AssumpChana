const FirestoreDB = require('../configs/Firestore');
const UserModel = require('./UserModel')
const TimeModel = require('./TimeModel')

module.exports = {
  UserModel: new UserModel(FirestoreDB),
  TimeModel: new TimeModel(FirestoreDB),
};