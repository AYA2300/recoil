import { PRIORITIES } from "../state/todostate";

export const getCurrentColor = (priority: PRIORITIES) => {
	switch (priority) {
		case "high":
			return "red.500";
		case "medium":
			return "orange.500";
		case "normal":
			return "gray.500";
	}
};
