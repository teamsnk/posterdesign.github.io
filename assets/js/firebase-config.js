/* =========================================================
   FIREBASE CONFIGURATION
   FILE: assets/js/firebase-config.js
   ========================================================= */

/*
 * IMPORTANT
 * ---------------------------------------------------------
 * এই file শুধু Firebase configuration রাখবে।
 *
 * Firebase Console থেকে নিজের project-এর config এখানে বসাবেন।
 *
 * Firebase API key public client-side config-এর অংশ হতে পারে,
 * কিন্তু Authentication / Firestore / Storage-এর security rules
 * অবশ্যই Firebase Console থেকে properly configure করতে হবে।
 */


/* =========================================================
   FIREBASE CONFIG
   ========================================================= */

const FIREBASE_CONFIG = {

    apiKey: "YOUR_FIREBASE_API_KEY",

    authDomain:
        "YOUR_PROJECT_ID.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT_ID.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_FIREBASE_APP_ID",

    measurementId:
        "YOUR_MEASUREMENT_ID"

};


/* =========================================================
   CONFIG STATUS
   ========================================================= */

const FirebaseConfig = {

    config: FIREBASE_CONFIG,

    isConfigured() {

        return (
            FIREBASE_CONFIG.apiKey &&
            FIREBASE_CONFIG.apiKey !==
                "YOUR_FIREBASE_API_KEY" &&

            FIREBASE_CONFIG.projectId &&
            FIREBASE_CONFIG.projectId !==
                "YOUR_PROJECT_ID" &&

            FIREBASE_CONFIG.appId &&
            FIREBASE_CONFIG.appId !==
                "YOUR_FIREBASE_APP_ID"
        );

    }

};


/* =========================================================
   GLOBAL ACCESS
   ========================================================= */

window.FIREBASE_CONFIG =
    FIREBASE_CONFIG;

window.FirebaseConfig =
    FirebaseConfig;
