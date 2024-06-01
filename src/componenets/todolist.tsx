import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListFilterState, todoListState } from "../state/todostate";
import { Box, Button, Checkbox, Input, Select } from "@chakra-ui/react";

function Todolist() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const filterdtodo = useRecoilValue(todoListFilterState);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<
    "High" | "medium" | "normal" | "finish"
  >("normal");

  const addTask = () => {
    setTodos([
      ...todos,
      { id: Date.now(), text: newTask, priority, completed: false },
    ]);
   
  };

  const checkCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Box>
      <Box display="flex">
        <Input w="600px"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="add new Task"
        />
        <Select width="120px"
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value as "High" | "medium" | "normal" | "finish"
            )
          }
        >
          <option value="High">High</option>
          <option value="medium">Medium</option>
          <option value="normal">Normal</option>
          <option value="finish">Finish</option>
        </Select>
        <Button size='md' onClick={addTask}>Add Task</Button>
        </Box>
   


        {filterdtodo.map((todo) => (
          <Box m={10} p='5px'
            key={todo.id}
            alignItems="center"
            bg={todo.completed ? "gray.200" : "white"}
            w="50%"
          >
            <Checkbox 
              isChecked={todo.completed}
              onChange={() => checkCompleted(todo.id)}
            >
              <Box textDecoration={todo.completed ? "line-through" : "none" } p={2} flex={1}>
              {todo.text}

              </Box>
            </Checkbox>
          </Box>
        ))}
  
    </Box>
  );
}

export default Todolist;
