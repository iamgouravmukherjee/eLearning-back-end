const router = require('express').Router();
const lessonModel = require('../models/lesson');
const courseModel = require('../models/course');
const userModel = require('../models/user');


const jwt = require('jsonwebtoken');
const config = require('../config/keys');

router.post('/', (req, res) => {
    lessonModel.find({}).sort({ _id: "1" })
        .then(docs => {
            let count = 1;
            for (let i = 0; i < docs.length; i += 3) {
                const lessons = docs.slice(i, i + 3).map(doc => doc._id);
                const course = new courseModel({
                    title: `course ${count}`,
                    description: `This is the desciption of course ${count}`,
                    imageUrl: "https://via.placeholder.com/600/6c757d",
                    lessons
                });
                course.save();
                count++;
            }
        })
    return res.json({ message: "Documents inserted successfully" });
});

router.get('/', (req, res) => {
    courseModel.find({}).populate({ path: 'lessons', populate: { path: 'assignments' } })
        .then(courses => {
            res.status(200).json({ message: "courses found", courses })
        })
        .catch(error => {
            res.status(500).json({ message: "unable to find courses", error });
        })
})

router.get('/:id', (req, res) => {
    const courseId = req.params.id;
    courseModel.find({ _id: courseId }).populate({ path: 'lessons', populate: { path: 'assignments' } })
        .then(course => {
            res.status(200).json({ message: 'course found', course })
        })
        .catch(error => {
            res.status(400).json({ message: "bad request", error })
        });
})

router.post('/addCourse/:courseId', (req, res) => {
    try {
        const payload = jwt.verify(req.body.token, config.secretOrKey);
        userModel.findOne({ email: payload.email })
            .then(doc => {
                let courses = [];
                if (!doc.courses.length) {
                    courses.push(req.params.courseId);
                } else {
                    courses = doc.courses.map(course => course.toString());
                    if (!courses.includes(req.params.courseId)) {
                        courses.push(req.params.courseId);
                    } else {
                        throw "Course already added";
                    }
                }
                userModel.findOneAndUpdate({ email: doc.email }, { $set: { courses } })
                    .then(doc => {
                        res.json({ message: 'verified', data: doc });
                    })
                    .catch(error => {
                        res.json({ message: 'not able to update', error });
                    })
            })
            .catch(error => {
                res.json({ error });
            })

    } catch (error) {
        res.status(401).json({ error });
    }
});

module.exports = router;