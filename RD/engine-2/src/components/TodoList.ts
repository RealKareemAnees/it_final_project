import { Component, h } from "../framework";
import type { VNode } from "../framework";
import { TodoItem } from "./TodoItem";
import type { Todo, TodoFilter, TodoState } from "./todo-types";

const FILTERS: TodoFilter[] = ["all", "active", "done"];

function getVisibleTodos(todos: Todo[], filter: TodoFilter): Todo[] {
  if (filter === "active") {
    return todos.filter((todo) => !todo.done);
  }

  if (filter === "done") {
    return todos.filter((todo) => todo.done);
  }

  return todos;
}

export class TodoList extends Component<{}, TodoState> {
  initState(): TodoState {
    return {
      todos: [
        { id: 1, text: "Learn MiniAct framework", done: false },
        { id: 2, text: "Build something cool", done: false },
        { id: 3, text: "Ace the college project", done: false },
      ],
      inputValue: "",
      filter: "all",
      nextId: 4,
    };
  }

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
      todos: [...prev.todos, { id: prev.nextId, text, done: false }],
      inputValue: "",
      nextId: prev.nextId + 1,
    }));
  };

  private toggleTodo = (id: number) => {
    this.setState((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    }));
  };

  private deleteTodo = (id: number) => {
    this.setState((prev) => ({
      todos: prev.todos.filter((todo) => todo.id !== id),
    }));
  };

  private setFilter = (filter: TodoFilter) => {
    this.setState({ filter });
  };

  private clearDone = () => {
    this.setState((prev) => ({
      todos: prev.todos.filter((todo) => !todo.done),
    }));
  };

  render(): VNode {
    const { todos, inputValue, filter } = this.state;
    const visibleTodos = getVisibleTodos(todos, filter);
    const doneCount = todos.filter((todo) => todo.done).length;

    return h(
      "div",
      { className: "todo card" },
      h("h2", { className: "todo__title" }, "Todo List"),
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
        h(
          "button",
          { className: "btn btn--primary", onClick: this.addTodo },
          "Add",
        ),
      ),
      h(
        "div",
        { className: "todo__filters" },
        ...FILTERS.map((itemFilter) =>
          h(
            "button",
            {
              key: itemFilter,
              className:
                "filter-btn" +
                (filter === itemFilter ? " filter-btn--active" : ""),
              onClick: () => this.setFilter(itemFilter),
            },
            itemFilter.charAt(0).toUpperCase() + itemFilter.slice(1),
          ),
        ),
      ),

      visibleTodos.length > 0
        ? h(
            "ul",
            { className: "todo__list" },
            ...visibleTodos.map((todo) =>
              h(TodoItem, {
                key: todo.id,
                todo,
                onToggle: this.toggleTodo,
                onDelete: this.deleteTodo,
              }),
            ),
          )
        : h("p", { className: "todo__empty" }, "Nothing here."),

      h(
        "div",
        { className: "todo__footer" },
        h("span", null, `${doneCount} / ${todos.length} done`),
        doneCount > 0
          ? h(
              "button",
              { className: "btn btn--ghost", onClick: this.clearDone },
              "Clear done",
            )
          : null,
      ),
    );
  }
}
