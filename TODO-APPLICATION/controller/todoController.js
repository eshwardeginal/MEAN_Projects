const Todo = require('../models/TODo');

// Get all to-do items for the authenticated user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new to-do item
exports.createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTodo = new Todo({
      user: req.user.id,
      title,
      description,
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a to-do item
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    let todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Ensure the user owns the todo item
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    todo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a to-do item
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Ensure the user owns the todo item
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Todo.findByIdAndDelete(id);

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
