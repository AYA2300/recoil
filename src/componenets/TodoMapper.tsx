import { Box, Checkbox, Flex } from "@chakra-ui/react";
import { getCurrentColor } from "../lib/getCurrentColor";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListFilterState, todoListState } from "../state/todostate";

const TodoMapper = () => {
	const [, setTodos] = useRecoilState(todoListState);
	const sortedTodos = useRecoilValue(todoListFilterState);

	const checkCompleted = (id: number) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};
	[];

	return (
		<Flex flexDirection={"column"} gap={5} alignItems={"center"} mt={5} mx={5}>
			{sortedTodos.map((todo) => (
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
	);
};

export default TodoMapper;
