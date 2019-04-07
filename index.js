const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const config = require('./db/config');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3002;

app.use(cors({
   "origin": "*",
   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
   "preflightContinue": false,
   "optionsSuccessStatus": 204
}));

app.use(bodyParser.json());
app.use('/api/user/', userRoutes);

server.listen(port, () => {
   console.log(`Server listening on port ${port}`);
})