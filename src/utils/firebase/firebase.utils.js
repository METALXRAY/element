import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signOut,
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

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;
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
				...additionalInformation,
			});
		} catch (error) {
			console.log("Error creating the user", error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailandPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signinAuthUserWithEmailandPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
