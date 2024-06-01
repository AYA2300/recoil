import { useState } from "react";

import "./App.css";
import { ChakraProvider, Heading, Box } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Todolist from "./componenets/todolist";

function App() {
  return (
    <>
      <RecoilRoot>
        <ChakraProvider>
          <Box>
            <Heading as="h1">Todo List</Heading>
           
              <Todolist />
           
          </Box>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
