const Todo = require('../models/todo');

module.exports = {
  getAllTodo: async (req, res) => {
    const user = req.user;

    const todos = await Todo.find({ userID: user.id }).populate('userID', ['_id', 'name']);

    res.json({
      message: 'berhasil mendapatkan data todo',
      data: todos,
    });
  },

  getTodoById: async (req, res) => {
    const { id } = req.params;
    const todos = await Todo.findById(id);

    res.json(todos);
  },

  createTodo: async (req, res) => {
    let data = req.body;

    await Todo.create(data);

    res.json({
      message: 'berhasil membuat data todo',
    });
  },

  deletedTodo: async (req, res) => {
    try {
      const todoId = req.params.id;

      if (!todoId) {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const result = await Todo.findByIdAndDelete(todoId);

      if (!result) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteAllTodo: async (req, res) => {
    try {
      const result = await Todo.deleteMany();

      res.json({ message: 'All todos deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updatedTodo: async (req, res) => {
    try {
      const todoId = req.params.id;
      const updatedTodo = req.body;

      if (!todoId || !updatedTodo) {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, { new: true });

      if (!result) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
