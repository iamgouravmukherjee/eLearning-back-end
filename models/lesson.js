const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assignment'
    }]
});

module.exports =  mongoose.model('lesson', lessonSchema);