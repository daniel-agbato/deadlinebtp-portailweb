import { Box, Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Overlay from "../components/Overlay";

function Home() {
	return (
		<Center
			minH="100vh"
			w="full"
			bgImage="https://leonard.vinci.com/wp-content/uploads/2020/01/inspire2-leonard-2175bd.jpg"
			bgRepeat="no-repeat"
			bgSize="cover"
			bgPosition="center center"
			position="relative">
			<Overlay />
			<VStack textAlign="center" maxW="500px" m="auto" px="4" spacing="10" zIndex="1">
				<Box color="whiteAlpha.800">
					<Text fontSize={["md", "lg"]}>Hello, welcome on</Text>
					<Heading as="h1" fontSize={["5xl", "7xl"]}>
						Deadline BTP
					</Heading>
					<Heading as="h2" fontSize="md" fontWeight="600">
						We simplify communication and collaboration between your building project contributor.
					</Heading>
				</Box>
				<Button as={Link} to="/profile" colorScheme="blue" size="lg" borderRadius="2">
					Continue
				</Button>
			</VStack>
		</Center>
	);
}

export default Home;
