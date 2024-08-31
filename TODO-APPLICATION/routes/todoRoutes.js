const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controller/todoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Apply auth middleware to protect routes
router.use(authMiddleware);

// Route to get all to-do items
router.get('/', getTodos);

// Route to create a new to-do item
router.post('/', createTodo);

// Route to update a to-do item
router.put('/:id', updateTodo);

// Route to delete a to-do item
router.delete('/:id', deleteTodo);

module.exports = router;
