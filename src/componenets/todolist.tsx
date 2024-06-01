import { Box } from "@chakra-ui/react";
import Form from "./Form";
import TodoMapper from "./TodoMapper";

function TodoList() {
	return (
		<Box mt={10} px={5}>
			<Form />
			<TodoMapper />
		</Box>
	);
}

export default TodoList;
