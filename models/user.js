const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   token: {
      type: String,
      required: false
   }
});
const users = mongoose.model('user', userSchema);

module.exports = users;