import { Box, Center, Grid } from "@chakra-ui/react";
import { ReactNode } from "react";
import Overlay from "../components/Overlay";

/* 
Authentification forms container
*/
function FormContainer({ children }: { children: ReactNode }) {
	return (
		<Grid
			flex="1"
			templateColumns={{ base: "0 1fr", lg: "1fr 1fr" }}
			w="full"
			overflow={{ base: "auto", lg: "hidden" }}>
			<Box
				bgImage="https://leonard.vinci.com/wp-content/uploads/2021/04/leonard-paris.jpg"
				bgRepeat="no-repeat"
				bgSize="cover"
				bgPosition="center center"
				position="relative">
				<Overlay bgColor="rgba(0,0,0, 0.5)" />
			</Box>
			<Center pb={["28", "8"]} pt="8" h="full" overflow="scroll">
				<Box w={{ base: "100%", sm: 500 }} m="auto" px={["4", "8"]}>
					{children}
				</Box>
			</Center>
		</Grid>
	);
}

export default FormContainer;
