import { useState, useContext } from "react";
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signinAuthUserWithEmailandPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

import Button from "../button/button.component";

//import { UserContext } from "../../contexts/user.context";

const defaultformFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultformFields);

	const { email, password } = formFields;

	//const { setCurrentUser } = useContext(UserContext);

	const resetFormFields = () => {
		setFormFields(defaultformFields);
	};

	const SignInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await signinAuthUserWithEmailandPassword(email, password);

			//setCurrentUser(user);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("Incorrect Password for Email");
					break;
				case "auth/user-not-code":
					alert("User Doesnt Exist");
					break;
				default:
					console.log(error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign In with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>
				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>
				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' buttonType='google' onClick={SignInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
