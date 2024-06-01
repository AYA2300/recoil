import { useState } from "react";
import {
	useRecoilState,
	// useRecoilValue
} from "recoil";
import {
	PRIORITIES,
	//  todoListFilterState,
	todoListState,
} from "../state/todostate";
import { Box, Button, Checkbox, Flex, Input, Select } from "@chakra-ui/react";
import { getCurrentColor } from "../lib/getCurrentColor";

function TodoList() {
	const [todos, setTodos] = useRecoilState(todoListState);
	// const filteredTodo = useRecoilValue(todoListFilterState);
	const [newTask, setNewTask] = useState("");
	const [priority, setPriority] = useState<PRIORITIES>("normal");

	const addTask = () => {
		setTodos((prev) => [
			...prev,
			{ id: Date.now(), text: newTask, priority, completed: false },
		]);
		setNewTask("");
		setPriority("normal");
	};

	const checkCompleted = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	return (
		<Box mt={10} px={5}>
			<Box
				display="flex"
				alignItems={"center"}
				justifyContent={"center"}
				gap={4}
				maxWidth={1200}
			>
				<Input
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					placeholder="add new Task"
					style={{
						flex: 1,
					}}
				/>
				<div>
					<Select
						value={priority}
						onChange={(e) => setPriority(e.target.value as PRIORITIES)}
						style={{
							width: "fit-content",
						}}
					>
						<option value={"high"}>High</option>
						<option value={"medium"}>Medium</option>
						<option value={"normal"}>Normal</option>
					</Select>
				</div>
				<Button size="md" onClick={addTask}>
					Add Task
				</Button>
			</Box>

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
