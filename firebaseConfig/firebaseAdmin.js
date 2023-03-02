var admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://langtime-27547-default-rtdb.firebaseio.com"
    }, "langtime")
  : admin.app("langtime");

export default app;
