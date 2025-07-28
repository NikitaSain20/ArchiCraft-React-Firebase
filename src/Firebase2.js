// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig2 = {
  apiKey: process.env.REACT_APP_FIREBASE2_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE2_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE2_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE2_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE2_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE2_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE2_MEASUREMENT_ID,
};

// Initialize Firebase
const app2 = initializeApp(firebaseConfig2, "app2");
// const analytics = getAnalytics(app2);
const storage = getStorage(app2);
export { storage };
