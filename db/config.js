const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:3001/test", { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (err) => {
   console.log('failed to connect to database');
});

db.once('open', () => {
   console.log('connection to database successful');
})

module.exports = mongoose;