// require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config();

module.exports = {
  login: async (req, res) => {
    const userLogin = req.body;

    try {
      const user = await User.findOne({ email: userLogin.email });
      if (!user) throw new Error('invalid user');

      console.log(user.password, userLogin.password);
      if (user.password !== userLogin.password) throw new Error('invalid user');

      const isPasswordValid = await bcrypt.compare(password, userLogin.password);

      if (!isPasswordValid) throw new Error('invalid user');

      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY);

      res.json({
        message: 'login successfull',
        userId: user._id,
        token,
      });
    } catch (error) {
      res.json(error.message);
    }
  },

  regis: async (req, res) => {
    try {
      const { name, username, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) throw new Error('Email already exists');

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, username, email, password, password: hashedPassword });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);

      res.status(201).json({
        message: 'user registered successfully',
        token,
      });
    } catch (error) {
      res.json(error.message);
    }
  },
};
