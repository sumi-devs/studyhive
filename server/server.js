const express = require('express');
const cors = require('cors');

const app = express();

// Let React talk to our server
app.use(cors());
app.use(express.json());

// Test if server works
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});