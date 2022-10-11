import { Alert, AlertIcon, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../components/TextField";
import FormContainer from "../containers/FormContainer";
import Layout from "../containers/Layout";
import { useCurrentUser } from "../context/currentUserContext";
import { signUpSchema } from "../schemas";
import { RegisterUserCredentials } from "../types";

function SignUp() {
	const [error, setError] = useState("");
	const userCtx = useCurrentUser();
	const navigate = useNavigate();

	// Formik Form submit handler
	const onSubmit = async (values: RegisterUserCredentials, actions: any) => {
		const response = await userCtx?.createUserAccount(values);
		if (response) {
			if (response.success) {
				navigate("/profile");
			} else {
				setError(response.msg);
				actions.resetForm();
			}
		}
	};

	// Formik initial values
	const initialValues: RegisterUserCredentials = {
		pseudo: "",
		lastname: "",
		firstname: "",
		address: "",
		email: "",
		phone: "",
		password: "",
	};

	return (
		<Layout>
			<FormContainer>
				<Formik initialValues={initialValues} validationSchema={signUpSchema} onSubmit={onSubmit}>
					<VStack as={Form} w="full" justify="center" spacing="4">
						<Heading>Create an account</Heading>
						<Text fontSize="xs">
							Already have an account?{" "}
							<Button variant="link" as={Link} to="/signin" textDecoration="underline" size="xs">
								login here
							</Button>
						</Text>
						{error && (
							<Alert status="error">
								<AlertIcon /> {error}
							</Alert>
						)}
						<TextField label="Pseudo" name="pseudo" placeholder="Enter your pseudo" />
						<TextField label="Lastname" name="lastname" placeholder="Enter your lastname" />
						<TextField label="Firstname" name="firstname" placeholder="Enter your firstname" />
						<TextField label="Address" name="address" placeholder="Enter your address" />
						<TextField type="email" label="Email" name="email" placeholder="Enter your email" />
						<TextField
							label="Phone number"
							name="phone"
							placeholder="Enter your phone number"
							helperText="Enter a French like phone number. ex: 0123456789"
						/>
						<TextField type="password" label="Password" name="password" placeholder="Enter your password" />
						<Button colorScheme="blue" type="submit" size="lg" borderRadius="2">
							Sign Up
						</Button>
					</VStack>
				</Formik>
			</FormContainer>
		</Layout>
	);
}

export default SignUp;
