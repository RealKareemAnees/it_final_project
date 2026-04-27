export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export type TodoFilter = "all" | "active" | "done";

export interface TodoState {
  todos: Todo[];
  inputValue: string;
  filter: TodoFilter;
  nextId: number;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
