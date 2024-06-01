import { atom, selector } from "recoil";

export type Todo = {
  id: number;
  text: string;
  priority: "high" | "medium" | "normal";
  completed: boolean;
}

export const todoListState = atom<Todo[]>({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = selector({
  key: "todoListFilterState",
  get: ({ get }) => {
    const list = get(todoListState);
    return list.sort((a, b) => {
      const priorities = { high: 0, medium: 1, normal: 2 };
      return priorities[a.priority] - priorities[b.priority];
    });
  },
});
