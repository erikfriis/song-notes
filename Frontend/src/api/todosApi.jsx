const todosEndpoint = "http://localhost:3000/api/todos";

const delay = () => new Promise((res) => setTimeout(() => res(), 500));

const getTodos = async (url) => {
	await delay();
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	return data;
};

const addTodo = async (newTodo) => {
	await delay();
	const res = await fetch(`${todosEndpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newTodo),
	});
	const data = await res.json();
	return data;
};

const updateTodo = async (id, body) => {
	await delay();
	console.log(id);
	console.log(body);
	const res = await fetch(`${todosEndpoint}/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const data = await res.json();
	return data;
};

const deleteTodo = async (id) => {
	await delay();
	const res = await fetch(`${todosEndpoint}/${id}`, {
		method: "DELETE",
	});
	const data = await res.json();
	return data;
};

export { todosEndpoint, getTodos, addTodo, updateTodo, deleteTodo };
