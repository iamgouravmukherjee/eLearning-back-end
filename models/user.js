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
   },
   courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course'
   }]
});
const users = mongoose.model('user', userSchema);

module.exports = users;