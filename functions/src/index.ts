import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const database = admin.firestore();

exports.countDocumentsOfObject = functions.https.onRequest(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.status(204).send("");
  } else {
    const collName = req.body.data.name;
    const userRef = database.collection(req.body.data.name);
    let userCount = 0;
    userRef.get().then(snap => {
      userCount = snap.size;
      res.status(200).send({ data: { returnValue: userCount, colName: collName } });
    }).catch(error => {
        console.log(error);
        return;
    });
  }
});
