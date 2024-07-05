// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

exports.register = async (req, res) => {
  const { email, password ,name} = req.body;
  try {
   // console.log(email, password ,name);
    const user = new User({  email, password ,name});
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).send('Error registering user');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: maxAge // Token expiration time
    });
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.send({ message: 'Login successful' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.send({ message: 'Logout successful' });
};

exports.getUser = async (req, res) => {
  const token = req.cookies.jwt;
 
  if (!token) {
    return res.status(401).send('Access denied');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    res.send(req.user);
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};