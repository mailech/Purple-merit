const express = require('express');
const { handler } = require('./functions/vibe-api');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Proxy requests to the Netlify function handler
// Using a regex-like or path prefix match compatible with Express 5
app.use('/.netlify/functions/vibe-api', async (req, res) => {
  const event = {
    path: '/.netlify/functions/vibe-api' + req.path,
    httpMethod: req.method,
    headers: req.headers,
    body: JSON.stringify(req.body),
    queryStringParameters: req.query
  };

  try {
    const result = await handler(event, {});
    
    // Set headers
    if (result.headers) {
      Object.keys(result.headers).forEach(key => {
        res.setHeader(key, result.headers[key]);
      });
    }
    
    res.status(result.statusCode || 200).send(result.body);
  } catch (error) {
    console.error('Dev Server Handler Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`\n🚀 Backend Dev Server running at: http://localhost:${port}/.netlify/functions/vibe-api`);
  console.log(`📡 API endpoints match live Netlify paths.\n`);
});
