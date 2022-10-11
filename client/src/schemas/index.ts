import * as Yup from "yup";

export const signUpSchema = Yup.object({
	pseudo: Yup.string()
		.min(2, "Pseudo is too short: 2 characters min")
		.max(100, "Pseudo is too long: 100 characters max")
		.required(),
	lastname: Yup.string()
		.min(2, "Lastname is too short: 2 characters min")
		.max(100, "Lastname is too long: 100 characters max")
		.required(),
	firstname: Yup.string()
		.min(2, "Firstname is too short: 2 characters min")
		.max(100, "Firstname is too long: 100 characters max")
		.required(),
	address: Yup.string()
		.min(2, "Address is too short: 2 characters min")
		.max(255, "Address is too long: 255 characters max")
		.required(),
	email: Yup.string().email("Email invalid").required(),
	phone: Yup.string()
		.matches(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gim, "Please provide a French like phone number")
		.required(),
	password: Yup.string().min(6, "Password must be at least 6 characters").required(),
});

export const signInSchema = Yup.object({
	email: Yup.string().email("Email invalid").required(),
	password: Yup.string().min(6, "Password must be at least 6 characters").required(),
});
