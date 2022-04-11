import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCKC_jzQr1l_Nv5J0HKjRN32ofclT4J0nM",
	authDomain: "element-clothing-db.firebaseapp.com",
	projectId: "element-clothing-db",
	storageBucket: "element-clothing-db.appspot.com",
	messagingSenderId: "575445623623",
	appId: "1:575445623623:web:af5fd3777ffe9da42e2262",
	measurementId: "G-5NBNP5FB9M",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup();
