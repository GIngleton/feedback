const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ big: '!' });
});

// Dynamic Port Binding
const PORT = process.env.PORT || 5000; // Heroku uses environment variables
app.listen(PORT);
