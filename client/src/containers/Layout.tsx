import { Tooltip, Flex, Heading, HStack, IconButton, Stack, Container, Box, Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import ToggleColorMode from "../components/ToggleColorMode";
import { useCurrentUser } from "../context/currentUserContext";

/* 
Global Layout container that wraps the others pages components
*/
function Layout({ children }: { children: ReactNode }) {
	const userCtx = useCurrentUser();
	return (
		<Stack h="100vh" spacing={0}>
			<Box borderBottomWidth="1px" borderBottomStyle="solid" boxShadow="md">
				<Container maxWidth={["100%", "90%"]}>
					<Flex align="center" justify="space-between" py="2" minH="60px">
						<Heading as={Link} to="/" fontSize="2xl" fontWeight="900">
							DeadlineBTP
						</Heading>
						<HStack>
							<Button as={ChakraLink} href="/api/v1/docs" isExternal size="sm">
								Docs
							</Button>
							<ToggleColorMode />
							{userCtx?.currentUser && (
								<Tooltip label="Logout">
									<IconButton
										onClick={() => userCtx?.logout()}
										icon={<MdLogout />}
										colorScheme="gray"
										mt="2"
										size="sm"
										aria-label="logout">
										Log out
									</IconButton>
								</Tooltip>
							)}
						</HStack>
					</Flex>
				</Container>
			</Box>
			{children}
		</Stack>
	);
}

export default Layout;
