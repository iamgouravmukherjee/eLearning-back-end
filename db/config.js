const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost/node-angular", { useNewUrlParser: true });
mongoose.connect("mongodb://root:tomatobox91!@ds115193.mlab.com:15193/multibhashi", { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (err) => {
   console.log('failed to connect to database', err);
});

db.once('open', () => {
   console.log('connection to database successful');
})

module.exports = mongoose;