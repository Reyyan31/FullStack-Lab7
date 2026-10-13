const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data (resets when the server restarts)
let users = [
  { id: 1, name: 'Ali' },
  { id: 2, name: 'Sara' },
];

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.get('/users', (req, res) => {
  res.json(users);
});8888888

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const user = { id: users.length + 1, name };
  users.push(user);
  res.status(201).json(user);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});