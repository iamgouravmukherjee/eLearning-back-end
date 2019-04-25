const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    lessons: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'lesson'
    }]
});

module.exports = mongoose.model('course', courseSchema);