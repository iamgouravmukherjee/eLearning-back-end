const router = require('express').Router();
const lessonModel = require('../models/lesson');
const assignmentModel = require('../models/assignment');

router.post('/', (req, res) => {
    assignmentModel.find({}).sort({ _id: "1" })
        .then(docs => {
            let count = 1;
            for (let i = 0; i < docs.length; i += 3) {
                const assignments = (docs.slice(i, i + 3).map(doc => doc._id));
                const lesson = new lessonModel({
                    title: `lesson ${count}`,
                    description: `This is the desciption of lesson ${count}`,
                    assignments
                });
                lesson.save();
                count++;
            }
        })
    return res.json({ message: "Documents inserted successfully" });
})

module.exports = router;