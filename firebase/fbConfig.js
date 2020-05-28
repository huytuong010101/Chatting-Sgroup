require("firebase/auth");
const firebase = require('firebase')
const admin = require('firebase-admin')
const serviceAccount = require("./serviceAccountKey.json");
const firebaseConfig = {
    apiKey: "AIzaSyBjwkMO_BLJBogNLSM1A1NhFykiYrQppTY",
    authDomain: "chattingsgroup.firebaseapp.com",
    databaseURL: "https://chattingsgroup.firebaseio.com",
    projectId: "chattingsgroup",
    storageBucket: "chattingsgroup.appspot.com",
    messagingSenderId: "836225984572",
    appId: "1:836225984572:web:7b91aab518aa5152ebfb39",
};
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chattingsgroup.firebaseio.com",
});
module.exports = { firebase, admin };