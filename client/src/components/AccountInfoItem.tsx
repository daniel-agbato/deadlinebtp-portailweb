import { Box, Grid, Text } from "@chakra-ui/react";
import _ from "lodash";

/* 
User account information item component
*/
function AccountInfoItem({ label, value }: { label: string; value: string | undefined }) {
	return (
		<Grid gap={2} templateColumns="1fr 3fr" w="full" alignItems="center">
			<Text fontSize={["sm", "md"]}>{_.upperFirst(label)}</Text>
			<Box borderRadius="2" borderWidth="1px" borderColor="gray.700" py="1" px="2">
				<Text fontSize={["sm", "md"]}>{value}</Text>
			</Box>
		</Grid>
	);
}

export default AccountInfoItem;
