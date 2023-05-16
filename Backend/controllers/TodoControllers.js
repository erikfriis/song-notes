import { Todo, validateTodo } from "../models/Todo.js";
import Joi from "joi";

const getAllTodos = async (req, res) => {
	try {
		const todos = await Todo.findAll();
		res.json(todos);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const createNewTodo = async (req, res) => {
	//input validation
	const { error } = validateTodo(req.body);
	console.log(error);
	if (error) return res.status(400).send(error.details[0].message);

	try {
		const { title, completed } = req.body;
		const todo = await Todo.create({ title, completed });
		res.json(todo);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const getTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await Todo.findByPk(id);

		if (!todo) return res.status(404).send("Not found!");

		res.json(todo);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const updateTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await Todo.findByPk(id);

		if (!todo) return res.status(404).send("Not found!");

		//input validation
		const { error } = validateTodo(req.body, { method: "patch" });
		if (error) return res.status(400).send(error.details[0].message);

		await todo.update(req.body);
		res.json(todo.toJSON());
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const deleteTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await Todo.findByPk(id);

		if (!todo) return res.status(404).send("Not found!");

		await todo.destroy();
		res.json(todo.toJSON());
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

export { getAllTodos, createNewTodo, getTodo, updateTodo, deleteTodo };
