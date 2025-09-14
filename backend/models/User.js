const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[a-zA-Z0-9._%+-]+@cb\.students\.amrita\.edu$/ 
  },
  password: { type: String, required: true },
  year: { type: String, enum: ["1st Year", "2nd Year", "3rd Year", "Final Year"], required: true },
  interests: [String],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
