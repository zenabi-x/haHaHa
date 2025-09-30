const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

const messages = {};

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/send', (req, res) => {
  const { password, message } = req.body;
  if (!password || !message) return res.json({ error: 'Password and message required' });

  messages[password] = message;
  res.json({ msg: 'Message stored successfully!' });
});


app.post('/get', (req, res) => {
  const { password } = req.body;
  if (!password) return res.json({ error: 'Password required' });

  const message = messages[password];
  if (!message) return res.json({ error: 'No message found for this password' });

  delete messages[password];

  res.json({ message });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
