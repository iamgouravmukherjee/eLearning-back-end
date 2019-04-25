const router = require('express').Router();
const assignmentModel = require('../models/assignment');

router.post('/', (req, res) => {
    for (let i = 1; i <= 54; i++) {
        const assignment = new assignmentModel({
            title: `assignment ${i}`,
            description: `This is the desciption of assignment ${i}`
        });
        assignment.save()
            .then(doc => {
                console.log('document inserted', doc);
            })
            .catch(err => {
                console.log('failed to insert document', err);
            })
    }
    return res.json({ message: "Documents inserted successfully" });
})

module.exports = router;