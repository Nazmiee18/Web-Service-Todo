const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  value: {
    type: String,
    require: true,
  },
  status: Boolean,
  userID: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
