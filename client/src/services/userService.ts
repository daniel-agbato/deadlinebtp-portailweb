import axios from "axios";
import { EditUserCredentials, LoginUserCredentials, RegisterUserCredentials } from "../types";

const baseUrl = "/api/v1/user"; // base API url

// Manage axios error
function handleAxiosError(error: Error | unknown) {
	if (axios.isAxiosError(error)) {
		return error.response?.data;
	} else {
		console.log("unexpected error: ", error);
		return "An unexpected error occurred";
	}
}

// Extract logged in user function
const extractLoggedInUser = () => {
	return JSON.parse(localStorage.getItem("deadline-currentUser") || "");
};

// POST request : create new user (generate new token) on the database
export const registerNewUser = async (credentials: RegisterUserCredentials) => {
	try {
		const config = {
			headers: { "Content-Type": "application/json" },
		};
		const { data } = await axios.post(baseUrl + "/register", credentials, config);
		return data;
	} catch (error) {
		return handleAxiosError(error);
	}
};

// POST request : login user and generate new token
export const loginUser = async (credentials: LoginUserCredentials) => {
	try {
		const config = {
			headers: { "Content-Type": "application/json" },
		};
		const { data } = await axios.post(baseUrl + "/login", credentials, config);
		return data;
	} catch (error) {
		return handleAxiosError(error);
	}
};

// PATCH request : update user details on database
export const updateUserProfile = async (credentials: EditUserCredentials) => {
	const loggedUserData = extractLoggedInUser();

	if (loggedUserData) {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${loggedUserData.token}`,
				},
			};
			const { data } = await axios.patch(baseUrl + "/profile", credentials, config);
			return data;
		} catch (error) {
			return handleAxiosError(error);
		}
	}
};

// DELETE request : remove user from database
export const deleteUser = async () => {
	const loggedUserData = extractLoggedInUser();

	if (loggedUserData) {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${loggedUserData.token}`,
				},
			};
			const { data } = await axios.delete(baseUrl + "/profile", config);
			return data;
		} catch (error) {
			return handleAxiosError(error);
		}
	}
};
