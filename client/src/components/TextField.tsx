import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { useState } from "react";

interface Props {
	label: string;
	name: string;
	placeholder: string;
	type?: string;
}

function TextField(props: Props) {
	const [show, setShow] = useState(false);
	const [field, meta] = useField(props);

	return (
		<FormControl isInvalid={meta.error !== undefined && meta.touched}>
			<FormLabel>{props.label}</FormLabel>
			<InputGroup size="md">
				<Input
					as={Field}
					{...field}
					name={props.name}
					type={show ? "text" : props.type || "text"}
					placeholder={props.placeholder}
					borderRadius="2"
					pr="4.5rem"
				/>
				{props.type === "password" && (
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
							{show ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				)}
			</InputGroup>
			<FormErrorMessage>{meta.error}</FormErrorMessage>
		</FormControl>
	);
}

export default TextField;
