import "firebase/auth/dist/index.cjs.js"
import firebase from 'firebase'
import admin from 'firebase-admin'
import serviceAccount from "./serviceAccountKey.js";
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
export { admin, firebase }
