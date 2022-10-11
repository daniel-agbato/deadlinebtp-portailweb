import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
	return (
		<Stack minH="100vh" spacing={0}>
			<Box py="2" px="4">
				<Heading fontSize="2xl">DeadlineBTP</Heading>
			</Box>
			<Center flex="1" p="4">
				{children}
			</Center>
		</Stack>
	);
}

export default Layout;
