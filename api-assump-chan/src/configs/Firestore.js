const Firestore = require('@google-cloud/firestore');

const { firestore: { projectId, keyFilename } } = require('./')

module.exports = new Firestore({ projectId, keyFilename });
