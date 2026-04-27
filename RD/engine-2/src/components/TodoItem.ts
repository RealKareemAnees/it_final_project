import { Component, h } from "../framework";
import type { VNode } from "../framework";
import type { TodoItemProps } from "./todo-types";

export class TodoItem extends Component<TodoItemProps> {
  render(): VNode {
    const { todo, onToggle, onDelete } = this.props;

    return h(
      "li",
      {
        className: "todo-item" + (todo.done ? " todo-item--done" : ""),
        key: todo.id,
      },
      h("input", {
        type: "checkbox",
        className: "todo-item__check",
        checked: todo.done,
        onChange: () => onToggle(todo.id),
      }),
      h("span", { className: "todo-item__text" }, todo.text),
      h(
        "button",
        {
          className: "todo-item__delete btn btn--danger",
          onClick: () => onDelete(todo.id),
        },
        "x",
      ),
    );
  }
}
