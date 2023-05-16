import express from "express";
import * as TodoController from "../controllers/TodoControllers.js";

const router = express.Router();
router.use(express.json());

router
	.route("/")
	.get(TodoController.getAllTodos)
	.post(TodoController.createNewTodo);

router
	.route("/:id")
	.get(TodoController.getTodo)
	.delete(TodoController.deleteTodo)
	.patch(TodoController.updateTodo);

export default router;
