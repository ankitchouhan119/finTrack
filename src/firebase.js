import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


// const firebaseConfig = {
//   apiKey: getConfig('REACT_APP_API_KEY'),
//   authDomain: getConfig('REACT_APP_AUTH_DOMAIN'),
//   projectId: getConfig('REACT_APP_PROJECT_ID'),
//   storageBucket: getConfig('REACT_APP_STORAGE_BUCKET'),
//   messagingSenderId: getConfig('REACT_APP_MESSAGING_SENDER_ID'),
//   appId: getConfig('REACT_APP_APP_ID'),
//   measurementId: getConfig('REACT_APP_MEASUREMENT_ID')
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const provider1 = new FacebookAuthProvider();

export { auth, provider, provider1 };
