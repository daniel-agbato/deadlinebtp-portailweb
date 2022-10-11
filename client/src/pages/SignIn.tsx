import { Alert, AlertIcon, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextField from "../components/TextField";
import FormContainer from "../containers/FormContainer";
import Layout from "../containers/Layout";
import { useCurrentUser } from "../context/currentUserContext";
import { signInSchema } from "../schemas";
import { LoginUserCredentials } from "../types";

function SignIn() {
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const userCtx = useCurrentUser();

	// Formik Form submit handler
	const onSubmit = async (values: LoginUserCredentials, actions: any) => {
		const response = await userCtx?.signInUser(values);
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
	const initialValues: LoginUserCredentials = {
		email: "",
		password: "",
	};

	return (
		<Layout>
			<FormContainer>
				<Formik initialValues={initialValues} validationSchema={signInSchema} onSubmit={onSubmit}>
					<VStack as={Form} w="full" justify="center" spacing="4">
						<Heading>Login to your account</Heading>
						<Text fontSize="xs">
							Doesn't have an account yet?{" "}
							<Button variant="link" as={Link} to="/signup" textDecoration="underline" size="xs">
								create an account here
							</Button>
						</Text>
						{error && (
							<Alert status="error">
								<AlertIcon /> {error}
							</Alert>
						)}
						<TextField type="email" label="Email" name="email" placeholder="Enter your email" />
						<TextField type="password" label="Password" name="password" placeholder="Enter your password" />
						<Button colorScheme="blue" type="submit" size="lg" borderRadius="2">
							Log in
						</Button>
					</VStack>
				</Formik>
			</FormContainer>
		</Layout>
	);
}

export default SignIn;
