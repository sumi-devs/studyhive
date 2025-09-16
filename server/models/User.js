const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  branch: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate']
  },
  interests: [{
    type: String
  }]
}, {
  timestamps: true,
  collection: 'users_master'
});

module.exports = mongoose.model('User', userSchema);