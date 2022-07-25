const admin = require('firebase-admin');
const serviceAccount = {
  "type": "service_account",
  "project_id": "nusassist",
  "private_key_id": process.env.private_key_id,
  "private_key": process.env.private_key,
  "client_email": "firebase-adminsdk-vg0am@nusassist.iam.gserviceaccount.com",
  "client_id": "102615693358193064986",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vg0am%40nusassist.iam.gserviceaccount.com"

}

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