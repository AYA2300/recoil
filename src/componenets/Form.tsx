/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Button, Input, Select } from "@chakra-ui/react";
import { PRIORITIES, todoItem, todoListState } from "../state/todostate";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useToast } from "@chakra-ui/react";

const Form = () => {
	const toast = useToast();

	const [, setTodos] = useRecoilState(todoListState);
	const [todo, setTodoItem] = useRecoilState(todoItem);
	const [newTask, setNewTask] = useState(todo ? todo.text : "");
	const [priority, setPriority] = useState<PRIORITIES>(
		todo ? todo.priority : "normal"
	);

	useEffect(() => {
		if (todo) {
			setNewTask(todo.text);
			setPriority(todo.priority);
		}
	}, [todo]);

	const handleResetForm = () => {
		setNewTask("");
		setPriority("normal");
	};

	const addTask = () => {
		if (newTask.length > 0) {
			if (!todo) {
				setTodos((prev) => [
					...prev,
					{ id: Date.now(), text: newTask, priority, completed: false },
				]);
			} else {
				setTodos((prev) =>
					prev.map((item) =>
						item.id === todo.id
							? {
									...todo,
									text: newTask,
									priority: priority,
							  }
							: item
					)
				);
				setTodoItem(undefined);
			}
			handleResetForm();
		} else {
			toast({
				title: "Please Enter A Task",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			display="flex"
			alignItems={"center"}
			justifyContent={"center"}
			mx={"auto"}
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
				{todo ? "Edit" : "Add"} Task
			</Button>
		</Box>
	);
};

export default Form;
