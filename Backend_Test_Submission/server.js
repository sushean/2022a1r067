const express = require('express');
const app = express();
const logMiddleware = require('./middleware/temp');
const shortenerRoutes = require('./shortener');

app.use(express.json());
app.use(logMiddleware);
app.use('/', shortenerRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});