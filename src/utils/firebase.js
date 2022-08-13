import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD5fAKwtozE0gqOM8NSb4facOD7GCUUsQQ",
  authDomain: "videotube-78109.firebaseapp.com",
  projectId: "videotube-78109",
  storageBucket: "videotube-78109.appspot.com",
  messagingSenderId: "374528313255",
  appId: "1:374528313255:web:db608d8e2ad51c08939882",
  measurementId: "G-0HHENS39E4",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
