import { Alert, AlertIcon, Box, Button, ButtonGroup, Center, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import Layout from "../containers/Layout";
import { useCurrentUser } from "../context/currentUserContext";
import { Form, Formik } from "formik";
import { useState } from "react";
import TextField from "../components/TextField";
import AccountInfoItem from "../components/AccountInfoItem";
import { editProfileSchema } from "../schemas";
import { EditUserCredentials } from "../types";

function Profile() {
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [isEdit, setIsEdit] = useState(false);
	const userCtx = useCurrentUser();

	const userData = userCtx?.currentUser;

	// Function for displaying a success alert when account details have been successfully updated
	const displaySuccessAlert = () => {
		setSuccess("Your changes have been successfully saved");
		setTimeout(() => {
			setSuccess("");
		}, 5000);
	};

	// Formik Form submit handler
	const onSubmit = async (values: EditUserCredentials) => {
		if (values.address === userData?.address && values.email === userData?.email) {
			setIsEdit(!isEdit);
			setError("");
			return;
		}

		const response = await userCtx?.editUserProfile(values);
		if (response) {
			if (response.success) {
				setError("");
				setIsEdit(!isEdit);
				displaySuccessAlert();
			} else {
				setError(response.msg);
			}
		}
	};

	// Formik initial values
	const initialValues: EditUserCredentials = {
		address: userData?.address || "",
		email: userData?.email || "",
	};

	return (
		<Layout>
			<Center flex="1" px="4" py="6">
				<Stack align="center" m="auto" w="full">
					<Box textAlign="center" mb="16">
						<Heading fontWeight={300} fontSize={["3xl", "5xl"]}>
							Welcome on your profile page{" "}
							<Text as="span" fontWeight={700}>
								{userData?.pseudo}
							</Text>
						</Heading>
						<Text fontSize={["sm", "md"]} mt="4">
							Here your can manage your account information
						</Text>
					</Box>
					<Formik initialValues={initialValues} validationSchema={editProfileSchema} onSubmit={onSubmit}>
						<Box w={{ base: "100%", sm: 600 }} maxW="100%" px="4">
							<VStack as={Form} w="full" justify="center" spacing="6">
								{error && (
									<Alert status="error">
										<AlertIcon /> {error}
									</Alert>
								)}
								{success && (
									<Alert status="success">
										<AlertIcon /> {success}
									</Alert>
								)}
								<AccountInfoItem label="pseudo" value={userData?.pseudo} />
								<AccountInfoItem label="lastname" value={userData?.lastname} />
								<AccountInfoItem label="firstname" value={userData?.firstname} />
								{!isEdit ? (
									<AccountInfoItem label="address" value={userData?.address} />
								) : (
									<TextField name="address" placeholder="Enter your address" helperText="Edit your address" />
								)}
								{!isEdit ? (
									<AccountInfoItem label="email" value={userData?.email} />
								) : (
									<TextField type="email" name="email" placeholder="Enter your email" helperText="Edit your email" />
								)}
								<AccountInfoItem label="phone" value={userData?.phone} />
								<AccountInfoItem label="Member since" value={userData?.createdAt.split("T")[0]} />
								<ButtonGroup w="full">
									{!isEdit && (
										<Button
											onClick={() => setIsEdit(!isEdit)}
											colorScheme="blue"
											variant="outline"
											type="button"
											w="full"
											borderRadius="2">
											Edit
										</Button>
									)}
									{isEdit && (
										<Button colorScheme="blue" type="submit" w="full" borderRadius="2">
											Confirm
										</Button>
									)}
									<Button
										onClick={() => userCtx?.deleteUserAccount()}
										colorScheme="red"
										type="button"
										w="full"
										borderRadius="2">
										Delete my account
									</Button>
								</ButtonGroup>
							</VStack>
						</Box>
					</Formik>
				</Stack>
			</Center>
		</Layout>
	);
}

export default Profile;
