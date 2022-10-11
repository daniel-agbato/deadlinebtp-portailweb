import { Box } from "@chakra-ui/react";

function Overlay({ bgColor = "rgba(0,0,0, 0.75)" }: { bgColor?: string }) {
	return <Box position="absolute" top="0" left="0" right="0" bottom="0" w="full" h="full" bgColor={bgColor} />;
}

export default Overlay;
