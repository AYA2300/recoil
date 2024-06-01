import "./App.css";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Todolist from "./componenets/todolist";

function App() {
	return (
		<>
			<RecoilRoot>
				<ChakraProvider>
					<Box>
						<Todolist />
					</Box>
				</ChakraProvider>
			</RecoilRoot>
		</>
	);
}

export default App;
