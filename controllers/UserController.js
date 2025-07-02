const User = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwt';

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ movies: user.likedMovies });
    } else return res.status(404).json({ message: "User with given email not found." });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching movies." });
  }
};

exports.addLikedMovie = async (req, res) => {
  try {
    console.log("addLikedMovie", req.body);
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!Array.isArray(user.likedMovies)) {
      user.likedMovies = [];
    }

    if (user.likedMovies.some((m) => m.id === data.id)) {
      return res.status(400).json({ message: 'Movie already liked' });
    }
    user.likedMovies.push(data);
    await user.save();
    res.json({ movies: user.likedMovies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeLikedMovie = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.likedMovies = user.likedMovies.filter((m) => m.id !== movieId);
    await user.save();
    res.json({ movies: user.likedMovies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
