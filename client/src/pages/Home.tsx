import { Box, Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home() {
	return (
		<Center minH="100vh" w="full">
			<VStack textAlign="center" maxW="400px" m="auto" px="4" spacing="10">
				<Box>
					<Text>Hello, welcome on</Text>
					<Heading as="h1" fontSize="5xl">
						Deadline BTP
					</Heading>
					<Heading as="h2" fontSize="md" fontWeight="600" color="gray.300">
						We simplify communication and collaboration between your building project contributor.
					</Heading>
				</Box>
				<Button as={Link} to="/profile" colorScheme="blue" size="lg" borderRadius="0">
					Continue
				</Button>
			</VStack>
		</Center>
	);
}

export default Home;
