import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListFilterState, todoListState } from "../state/todostate";
import { Box, Button, Checkbox, Input, Select } from "@chakra-ui/react";

function TodoList() {
	const [todos, setTodos] = useRecoilState(todoListState);
	const filteredTodo = useRecoilValue(todoListFilterState);
	const [newTask, setNewTask] = useState("");
	const [priority, setPriority] = useState<"high" | "medium" | "normal">(
		"normal"
	);

	const addTask = () => {
		setTodos([
			...todos,
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
						onChange={(e) =>
							setPriority(e.target.value as "high" | "medium" | "normal")
						}
						style={{
							width: "fit-content",
						}}
					>
						<option value="High">High</option>
						<option value="medium">Medium</option>
						<option value="normal">Normal</option>
					</Select>
				</div>
				<Button size="md" onClick={addTask}>
					Add Task
				</Button>
			</Box>

			{filteredTodo.map((todo) => (
				<Box
					m={10}
					p={4}
					key={todo.id}
					alignItems="center"
					bg={todo.completed ? "gray.200" : "gray.300"}
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
						>
							{todo.text}
						</Box>
					</Checkbox>
				</Box>
			))}
		</Box>
	);
}

export default TodoList;
