const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://root:tomatobox91!@cluster0-txkda.gcp.mongodb.net/test", { useNewUrlParser: true });
mongoose.connect("mongodb://justwork925:tomatobox91!@ds159767.mlab.com:59767/iamtesting", { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (err) => {
   console.log('failed to connect to database');
});

db.once('open', () => {
   console.log('connection to database successful');
})

module.exports = mongoose;