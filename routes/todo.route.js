const express = require('express');
const { getAllTodo, getTodoById, createTodo, updatedTodo, deletedTodo, deleteAllTodo } = require('../controllers/todo.controller');
const route = express.Router();
const verifyToken = require('../middleware/auth');

route.get('/', verifyToken, getAllTodo);
route.get('/:id', getTodoById);
route.post('/', createTodo);
route.put('/:id', updatedTodo);
route.delete('/:id', deletedTodo);
route.delete('/delete-all', deleteAllTodo);

module.exports = route;
