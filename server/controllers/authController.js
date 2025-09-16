const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { username, email, password, branch, year, interests } = req.body;

    // checking if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      });
    }

    // hasing password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      branch,
      year,
      interests
    });

    const savedUser = await newUser.save();

    // creating JWT token
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // (don't send password)
    const userResponse = {
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      branch: savedUser.branch,
      year: savedUser.year,
      interests: savedUser.interests
    };

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // finding user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // checking password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // creating JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // (don't send password)
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      branch: user.branch,
      year: user.year,
      interests: user.interests
    };

    res.json({
      message: 'Login successful',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { signup, login };