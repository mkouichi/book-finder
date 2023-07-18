import 'dotenv/config';
import express from 'express';

const apiKey = process.env.API_KEY;
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/api-key', (req, res) => {
  res.json({ apiKey });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
