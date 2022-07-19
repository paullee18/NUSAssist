const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: 'https://nusassist.firebaseio.com',
});

async function decodeIDToken(req, res, next) {
  const header = req.headers?.authorisation;
  if (header !== 'Bearer null' && req.headers?.authorisation?.startsWith('Bearer ')) {
        const idToken = req.headers.authorisation.split('Bearer ')[1];
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            req['currentUser'] = decodedToken;
        } catch (err) {
            console.log(err);
        }
    }
  next();
}

module.exports = decodeIDToken;