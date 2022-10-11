import { Button, Icon, useColorMode } from "@chakra-ui/react";
import { HiSun, HiMoon } from "react-icons/hi";

function ToggleColorMode() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Button onClick={() => toggleColorMode()} size="sm">
			{colorMode === "dark" ? <Icon as={HiSun} color="orange.200" /> : <Icon as={HiMoon} color="blue.700" />}
		</Button>
	);
}

export default ToggleColorMode;
