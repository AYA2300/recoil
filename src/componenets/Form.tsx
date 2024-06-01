import { Box, Button, Input, Select } from "@chakra-ui/react";
import { PRIORITIES, todoListState } from "../state/todostate";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useToast } from "@chakra-ui/react";

const Form = () => {
	const toast = useToast();

	const [, setTodos] = useRecoilState(todoListState);
	const [newTask, setNewTask] = useState("");
	const [priority, setPriority] = useState<PRIORITIES>("normal");

	const addTask = () => {
		if (newTask.length > 0) {
			setTodos((prev) => [
				...prev,
				{ id: Date.now(), text: newTask, priority, completed: false },
			]);
			setNewTask("");
			setPriority("normal");
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
	);
};

export default Form;
