// Firebase Configuration
// Replace these values with your Firebase project credentials
// Get them from: https://console.firebase.google.com/project/YOUR_PROJECT/settings/general/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const firebase = require('@react-native-firebase/app');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const auth = require('@react-native-firebase/auth');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const firestore = require('@react-native-firebase/firestore');

// Your Firebase configuration
// TODO: Replace with your own Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
};

// Initialize Firebase
let app: any;
let firebaseAuth: any;
let db: any;

try {
  app = firebase.initializeApp(firebaseConfig);
  firebaseAuth = auth.getAuth(app);
  db = firestore.getFirestore(app);
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export const getFirebaseApp = () => app;
export const getFirebaseAuth = () => firebaseAuth;
export const getFirebaseDb = () => db;

export { app, firebaseAuth as auth, db };
