const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const assignment = mongoose.model('assignment', assignmentSchema);

module.exports = assignment;