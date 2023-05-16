export const addTodoOption = (newTodo, todos) => {
	return {
		optimisticData: [...todos, { ...newTodo, isPending: true }],
		rollbackError: false,
		populateCache: false,
		revalidate: true,
	};
};

export const updateTodoOptions = (id, body) => {
	return {
		optimisticData: (todos) => {
			const index = todos.findIndex((item) => item.id === id);
			todos[index] = { ...todos[index], ...body };
			return [...todos];
		},
		rollbackError: true,
		populateCache: false,
		revalidate: false,
	};
};

export const deleteTodoOptions = (id) => {
	return {
		optimisticData: (todos) => {
			const index = todos.findIndex((item) => item.id === id);
			todos.splice(index, 1);
			return [...todos];
		},
		rollbackError: true,
		populateCache: false,
		revalidate: true,
	};
};
