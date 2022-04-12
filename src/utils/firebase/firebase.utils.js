import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);

	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);

	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log("Error creating the user", error.message);
		}
	}

	return userDocRef;

	// if user data exists

	// return userdocref
	// else if user data doesnt exists

	// create / set the document  with the data from userauth in my collection
};
