import { Alert, AlertIcon, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../components/TextField";
import FormContainer from "../containers/FormContainer";
import Layout from "../containers/Layout";
import { useCurrentUser } from "../context/currentUserContext";
import { signUpSchema } from "../schemas";
import { registerNewUser } from "../services/userService";

interface SignUpFormValues {
	pseudo: string;
	lastname: string;
	firstname: string;
	address: string;
	email: string;
	phone: string;
	password: string;
}

function SignUp() {
	const [error, setError] = useState(false);
	const navigate = useNavigate();
	const userCtx = useCurrentUser();

	const onSubmit = async (values: SignUpFormValues, actions: any) => {
		const response = await registerNewUser(values);
		if (!response.success) {
			setError(response.msg);
		} else {
			actions.resetForm();
			// HERE ADD TO LOCAL STORAGE
			userCtx?.defineCurrentUser(response.results);
			navigate("/profile");
		}
	};
	return (
		<Layout>
			<FormContainer>
				<Formik
					initialValues={{
						pseudo: "",
						lastname: "",
						firstname: "",
						address: "",
						email: "",
						phone: "",
						password: "",
					}}
					validationSchema={signUpSchema}
					onSubmit={onSubmit}>
					<VStack as={Form} w="full" justify="center" spacing="4">
						<Heading>Create an account</Heading>
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
						<TextField label="Phone number" name="phone" placeholder="Enter your phone number" />
						<TextField type="password" label="Password" name="password" placeholder="Enter your password" />
						<Button colorScheme="blue" type="submit" size="lg" borderRadius="0">
							Sign Up
						</Button>
						<Text fontSize="xs">
							Already have an account?{" "}
							<Button variant="link" as={Link} to="/signin" textDecoration="underline" size="xs">
								log in here
							</Button>
						</Text>
					</VStack>
				</Formik>
			</FormContainer>
		</Layout>
	);
}

export default SignUp;
