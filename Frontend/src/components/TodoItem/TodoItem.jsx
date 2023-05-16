import { useState, useEffect } from "react";

import TodoItemCss from "./TodoItem.module.css";

import Button from "../Button/Button";

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
	const { title, id, isCompleted, isPending } = todo;

	const [checkbox, setCheckbox] = useState(isCompleted);

	const wrapperClassName = [TodoItemCss.todoItemContainer];
	if (isPending) wrapperClassName.push(TodoItemCss.pending);
	if (isCompleted) wrapperClassName.push(TodoItemCss.completed);

	return (
		<div className={wrapperClassName.join(" ")}>
			<div className={TodoItemCss.checkboxWrapper}>
				<input
					disabled={isPending}
					type="checkbox"
					checked={checkbox}
					onChange={(e) => {
						const checked = e.target.checked;
						setCheckbox(checked);

						updateTodo(id, { isCompleted: checked });
					}}
				/>
			</div>
			<div className={TodoItemCss.classnameWrapper}>
				<span className={TodoItemCss.todoTitle}>{title}</span>
			</div>
			<div className={TodoItemCss.buttonsWrapper}>
				{!isPending && (
					<>
						<Button
							onClick={(e) => {
								e.stopPropagation();
								deleteTodo(id);
							}}
						></Button>
					</>
				)}
			</div>
		</div>
	);
};

export default TodoItem;
