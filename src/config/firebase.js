import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7YlbA50Vl5Qi8Qmd-LpRxwijmn7f8z2o",
  authDomain: "markdown-editor-48193.firebaseapp.com",
  projectId: "markdown-editor-48193",
  storageBucket: "markdown-editor-48193.appspot.com",
  messagingSenderId: "823260975141",
  appId: "1:823260975141:web:64d583352c28aebdc5afcc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app
