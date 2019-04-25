const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const assignmentRoutes = require('./routes/assignment');
const lessonRoutes = require('./routes/lesson');
const courseRoutes = require('./routes/course');
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
app.use('/api/assignments', assignmentRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/courses', courseRoutes);

server.listen(port, () => {
   console.log(`Server listening on port ${port}`);
})