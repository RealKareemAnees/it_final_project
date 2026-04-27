// ============================================================
//  TodoList – demonstrates: keyed lists, complex state,
//             conditional rendering, child components
// ============================================================

import { Component, h } from "../framework";

// ── Types ─────────────────────────────────────────────────────────────────

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type Filter = "all" | "active" | "done";

interface TodoState {
  todos: Todo[];
  inputValue: string;
  filter: Filter;
  nextId: number;
}

// ── TodoItem sub-component ─────────────────────────────────────────────────

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

class TodoItem extends Component<TodoItemProps> {
  render() {
    const { todo, onToggle, onDelete } = this.props;

    return h(
      "li",
      { className: "todo-item" + (todo.done ? " todo-item--done" : ""), key: todo.id },
      h("input", {
        type: "checkbox",
        className: "todo-item__check",
        checked: todo.done,
        onChange: () => onToggle(todo.id),
      }),
      h("span", { className: "todo-item__text" }, todo.text),
      h(
        "button",
        { className: "todo-item__delete btn btn--danger", onClick: () => onDelete(todo.id) },
        "✕"
      )
    );
  }
}

// ── TodoList ───────────────────────────────────────────────────────────────

export class TodoList extends Component<{}, TodoState> {
  initState(): TodoState {
    return {
      todos: [
        { id: 1, text: "Learn MiniAct framework 🚀", done: false },
        { id: 2, text: "Build something cool", done: false },
        { id: 3, text: "Ace the college project", done: false },
      ],
      inputValue: "",
      filter: "all",
      nextId: 4,
    };
  }

  // ── Handlers ───────────────────────────────────────────────────────────

  private handleInput = (e: Event) => {
    this.setState({ inputValue: (e.target as HTMLInputElement).value });
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") this.addTodo();
  };

  private addTodo = () => {
    const text = this.state.inputValue.trim();
    if (!text) return;

    this.setState((prev) => ({
      todos: [
        ...prev.todos,
        { id: prev.nextId, text, done: false },
      ],
      inputValue: "",
      nextId: prev.nextId + 1,
    }));
  };

  private toggleTodo = (id: number) => {
    this.setState((prev) => ({
      todos: prev.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    }));
  };

  private deleteTodo = (id: number) => {
    this.setState((prev) => ({
      todos: prev.todos.filter((t) => t.id !== id),
    }));
  };

  private setFilter = (filter: Filter) => {
    this.setState({ filter });
  };

  private clearDone = () => {
    this.setState((prev) => ({
      todos: prev.todos.filter((t) => !t.done),
    }));
  };

  // ── Render ─────────────────────────────────────────────────────────────

  render() {
    const { todos, inputValue, filter } = this.state;

    const visible =
      filter === "all"
        ? todos
        : filter === "active"
        ? todos.filter((t) => !t.done)
        : todos.filter((t) => t.done);

    const doneCount = todos.filter((t) => t.done).length;
    const filters: Filter[] = ["all", "active", "done"];

    return h(
      "div",
      { className: "todo card" },

      // Header
      h("h2", { className: "todo__title" }, "Todo List"),

      // Input row
      h(
        "div",
        { className: "todo__input-row" },
        h("input", {
          className: "todo__input",
          type: "text",
          placeholder: "Add a new task…",
          value: inputValue,
          onInput: this.handleInput,
          onKeydown: this.handleKeyDown,
        }),
        h("button", { className: "btn btn--primary", onClick: this.addTodo }, "Add")
      ),

      // Filter tabs
      h(
        "div",
        { className: "todo__filters" },
        ...filters.map((f) =>
          h(
            "button",
            {
              key: f,
              className: "filter-btn" + (filter === f ? " filter-btn--active" : ""),
              onClick: () => this.setFilter(f),
            },
            f.charAt(0).toUpperCase() + f.slice(1)
          )
        )
      ),

      // List (keyed so MiniAct can track items by id)
      visible.length > 0
        ? h(
            "ul",
            { className: "todo__list" },
            ...visible.map((todo) =>
              h(TodoItem, {
                key: todo.id,
                todo,
                onToggle: this.toggleTodo,
                onDelete: this.deleteTodo,
              })
            )
          )
        : h("p", { className: "todo__empty" }, "Nothing here! ✨"),

      // Footer
      h(
        "div",
        { className: "todo__footer" },
        h("span", null, `${doneCount} / ${todos.length} done`),
        doneCount > 0
          ? h(
              "button",
              { className: "btn btn--ghost", onClick: this.clearDone },
              "Clear done"
            )
          : null as any
      )
    );
  }
}
