import { createContext, ReactNode, useContext, useState } from "react";
import { deleteUser, loginUser, registerNewUser, updateUserProfile } from "../services/userService";
import {
	APIResponseType,
	EditUserCredentials,
	LoginUserCredentials,
	RegisterUserCredentials,
	UserInfoObj,
} from "../types";

interface ContextInterface {
	currentUser: UserInfoObj | null;
	createUserAccount: (values: RegisterUserCredentials) => Promise<APIResponseType>;
	signInUser: (values: LoginUserCredentials) => Promise<APIResponseType>;
	logout: () => void;
	editUserProfile: (values: EditUserCredentials) => Promise<APIResponseType>;
	deleteUserAccount: () => Promise<void>;
}

export const CurrentUserContext = createContext<ContextInterface | null>(null);

// Current user context provider
export function CurrentUserProvider({ children }: { children: ReactNode }) {
	const LS = localStorage.getItem("deadline-currentUser");
	const [currentUser, setCurrentUser] = useState<UserInfoObj | null>(LS ? JSON.parse(LS) : null);

	// Function to create a new user account and add it to the database
	const createUserAccount = async (values: RegisterUserCredentials) => {
		const response: APIResponseType = await registerNewUser(values);
		if (response.success) {
			setCurrentUser(response.results);
			localStorage.setItem("deadline-currentUser", JSON.stringify(response.results));
		}
		return response;
	};

	// Function to sign in a user
	const signInUser = async (values: LoginUserCredentials) => {
		const response: APIResponseType = await loginUser(values);
		if (response.success) {
			setCurrentUser(response.results);
			localStorage.setItem("deadline-currentUser", JSON.stringify(response.results));
		}
		return response;
	};

	// Function to log out the current logged in user
	const logout = () => {
		setCurrentUser(null);
		localStorage.removeItem("deadline-currentUser");
	};

	// Function to edit user account details and update it on the database
	const editUserProfile = async (values: EditUserCredentials) => {
		const response: APIResponseType = await updateUserProfile(values);
		if (response.success && currentUser) {
			const newUserData = { ...response.results, token: currentUser.token };
			setCurrentUser(newUserData);
			localStorage.setItem("deadline-currentUser", JSON.stringify(newUserData));
		}
		return response;
	};

	// Function to remove user account and delete it from the database
	const deleteUserAccount = async () => {
		const confirm = window.confirm("Are you sure you want to delete your account?");
		if (confirm) {
			const response: { success: boolean; msg: string } = await deleteUser();
			if (response.success) {
				setCurrentUser(null);
				localStorage.removeItem("deadline-currentUser");
			}
		}
	};

	return (
		<CurrentUserContext.Provider
			value={{
				currentUser,
				createUserAccount,
				signInUser,
				logout,
				editUserProfile,
				deleteUserAccount,
			}}>
			{children}
		</CurrentUserContext.Provider>
	);
}

// hook to access the currentUser context
export const useCurrentUser = () => useContext(CurrentUserContext);
