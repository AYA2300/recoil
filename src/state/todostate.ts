import { atom, selector } from "recoil";

export interface Todo {
  id: number;
  text: string;
  priority: "High" | "medium" | "normal" | "finish";
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
      const priorities = { High: 0, medium: 1, normal: 2, finish: 3 };
      return priorities[a.priority] - priorities[b.priority];
    });
  },
});
