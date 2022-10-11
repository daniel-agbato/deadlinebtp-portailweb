import axios from "axios";
import { LoginUserCredentials, RegisterUserCredentials } from "../types";

const baseUrl = "/api/v1/user";

function handleAxiosError(error: Error | unknown) {
	if (axios.isAxiosError(error)) {
		return error.response?.data;
	} else {
		console.log("unexpected error: ", error);
		return "An unexpected error occurred";
	}
}

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
