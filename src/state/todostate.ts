import { atom, selector } from "recoil";

export type PRIORITIES = "high" | "medium" | "normal";
const priorities = { high: 0, medium: 1, normal: 2 };
const completed = { true: 1, false: 0 };

export type Todo = {
	id: number;
	text: string;
	priority: PRIORITIES;
	completed: boolean;
};

export const todoListState = atom<Todo[]>({
	key: "todoListState",
	default: [],
});

export const todoItem = atom<Todo | undefined>({
	key: "todoItem",
	default: undefined,
});

export const todoListFilterState = selector({
	key: "todoListFilterState",
	get: ({ get }) => {
		const list = [...get(todoListState)];
		list.sort((a, b) => {
			return priorities[a.priority] - priorities[b.priority];
		});
		list.sort((a, b) => {
			return completed[`${a.completed}`] - completed[`${b.completed}`];
		});

		return list;
	},
});
