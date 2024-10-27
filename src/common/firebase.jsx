// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2IqLGQaNoRlOKs1acFBiAfHk6QtCnduw",
  authDomain: "react-js-blog-website-yt-6e394.firebaseapp.com",
  projectId: "react-js-blog-website-yt-6e394",
  storageBucket: "react-js-blog-website-yt-6e394.appspot.com",
  messagingSenderId: "313482764855",
  appId: "1:313482764855:web:36198d59da5fdd404095b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);  // Ensure to pass the app instance
const provider = new GoogleAuthProvider();

const authWithGoogle = async () => {
    let user = null;

    try {
        const result = await signInWithPopup(auth, provider);
        user = result.user;  // Accessing user as a property
    } catch (err) {
        console.error("Error during authentication:", err);
    }

    return user;  // Returning the user object
}

export default { authWithGoogle, getAuth, signInWithPopup, GoogleAuthProvider };
