import { useState, useEffect } from "react";

import TodoItem from "./components/TodoItem/TodoItem.jsx";

import AppCss from "./App.module.css";

import useSWR from "swr";

import {
	getTodos,
	addTodo,
	updateTodo,
	deleteTodo,
	todosEndpoint as cacheKey,
} from "./api/todosApi";

import {
	addTodoOption,
	updateTodoOptions,
	deleteTodoOptions,
} from "./api/todosSWROptions.jsx";

const App = () => {
	const [newTodo, setNewTodo] = useState("");
	const [isSyncing, setIsSyncing] = useState(false);
	const [mutationCounter, setMutationCounter] = useState(0);

	const { isLoading, error, isValidating, data, mutate } = useSWR(
		cacheKey,
		getTodos
	);

	useEffect(() => {
		if (isValidating || mutationCounter > 0) {
			setIsSyncing(true);
		} else {
			setIsSyncing(false);
		}
	}, [isValidating, mutationCounter]);

	const addTodomutation = async (newTodo) => {
		setMutationCounter((counter) => ++counter);
		try {
			await mutate(addTodo(newTodo), addTodoOption(newTodo, data));

			console.log("Success!");
		} catch (err) {
			console.log("Falied!");
		}
		setMutationCounter((counter) => --counter);
	};

	const updateTodoMutation = async (id, body) => {
		setMutationCounter((counter) => ++counter);
		try {
			await mutate(updateTodo(id, body), updateTodoOptions(id, body));
			console.log("Success!");
		} catch (err) {
			console.log("Falied!");
		}
		setMutationCounter((counter) => --counter);
	};

	const deleteTodoMutation = async (id) => {
		setMutationCounter((counter) => ++counter);
		try {
			await mutate(deleteTodo(id), deleteTodoOptions(id));
			console.log("Success");
		} catch (err) {
			console.log("Falied!");
		}
		setMutationCounter((counter) => --counter);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setNewTodo("");
		await addTodomutation({ title: newTodo });
	};

	if (error) return "An error has occurred.";
	if (isLoading) return <div className={AppCss.loader}></div>;

	return (
		<div className={AppCss.container}>
			<h1>SONG NOTES</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="type notes here"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				></input>
			</form>

			<div className={AppCss.todosContainer}>
				{data &&
					data
						.slice()
						.reverse()
						.map((todo, i) => (
							<TodoItem
								listIndex={i}
								key={todo.id || i}
								todo={todo}
								// isSelected={todosSelection.selected?.includes(i)}
								updateTodo={updateTodoMutation}
								deleteTodo={deleteTodoMutation}
							/>
						))}
			</div>

			{isSyncing && (
				<div className="sync-wrapper">
					<div className={AppCss.loader}></div>
				</div>
			)}
		</div>
	);
};

export default App;
