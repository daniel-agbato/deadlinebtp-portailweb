import { Alert, AlertIcon, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../components/TextField";
import FormContainer from "../containers/FormContainer";
import Layout from "../containers/Layout";
import { useCurrentUser } from "../context/currentUserContext";
import { signInSchema } from "../schemas";
import { loginUser } from "../services/userService";

interface SignInFormValues {
	email: string;
	password: string;
}

function SignIn() {
	const [error, setError] = useState(false);
	const navigate = useNavigate();
	const userCtx = useCurrentUser();

	const onSubmit = async (values: SignInFormValues, actions: any) => {
		const response = await loginUser(values);
		if (!response.success) {
			setError(response.msg);
		} else {
			actions.resetForm();
			// HERE ADD TO LOCAL STORAGE AND CONTEXT
			userCtx?.defineCurrentUser(response.results);
			navigate("/profile");
		}
	};

	return (
		<Layout>
			<FormContainer>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={signInSchema}
					onSubmit={onSubmit}>
					<VStack as={Form} w="full" justify="center" spacing="4">
						<Heading>Login to your account</Heading>
						{error && (
							<Alert status="error">
								<AlertIcon /> {error}
							</Alert>
						)}
						<TextField type="email" label="Email" name="email" placeholder="Enter your email" />
						<TextField type="password" label="Password" name="password" placeholder="Enter your password" />
						<Button colorScheme="blue" type="submit" size="lg" borderRadius="0">
							Log in
						</Button>
						<Text fontSize="xs">
							Doesn't have an account yet?{" "}
							<Button variant="link" as={Link} to="/signup" textDecoration="underline" size="xs">
								create an account
							</Button>
						</Text>
					</VStack>
				</Formik>
			</FormContainer>
		</Layout>
	);
}

export default SignIn;
