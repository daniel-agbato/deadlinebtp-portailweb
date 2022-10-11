import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

function FormContainer({ children }: { children: ReactNode }) {
	return (
		<Box w={{ base: "90%", md: 500 }} m="auto">
			{children}
		</Box>
	);
}

export default FormContainer;
