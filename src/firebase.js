import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { FIREBASE_CONFIG } from "./utils/config";

const app = initializeApp(FIREBASE_CONFIG);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const provider1 = new FacebookAuthProvider();

export { auth, provider, provider1 };
