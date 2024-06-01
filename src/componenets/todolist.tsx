import {
	useRecoilState,
	// useRecoilValue
} from "recoil";
import { todoListState } from "../state/todostate";
import { Box, Checkbox, Flex } from "@chakra-ui/react";
import { getCurrentColor } from "../lib/getCurrentColor";
import Form from "./Form";

function TodoList() {
	const [todos, setTodos] = useRecoilState(todoListState);

	const checkCompleted = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	return (
		<Box mt={10} px={5}>
			<Form />

			<Flex
				flexDirection={"column"}
				gap={5}
				alignItems={"center"}
				mt={5}
				mx={5}
			>
				{todos.map((todo) => (
					<Box
						w={"100%"}
						p={4}
						key={todo.id}
						alignItems="center"
						bg={todo.completed ? "gray.300" : getCurrentColor(todo.priority)}
						rounded={"4px"}
					>
						<Checkbox
							isChecked={todo.completed}
							onChange={() => checkCompleted(todo.id)}
						>
							<Box
								textDecoration={todo.completed ? "line-through" : "none"}
								p={2}
								flex={1}
								color={"white"}
							>
								{todo.text}
							</Box>
						</Checkbox>
					</Box>
				))}
			</Flex>
		</Box>
	);
}

export default TodoList;
