const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const prescriptionsRoute = require('./routes/prescriptions');
const learningsRoute = require('./routes/learnings');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/prescriptions', prescriptionsRoute);
app.use('/api/learnings', learningsRoute);

app.listen(PORT, () => {
  console.log(`MCP Server running on http://localhost:${PORT}`);
});
