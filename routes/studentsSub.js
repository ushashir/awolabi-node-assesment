const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const StudentsSub = require('../models/StudentsSub')

// GET api/students  - view subscription history - Private access (only admin)
router.get('/', auth,  async (req, res) => { 
    try {
        const studentsSub = await StudentsSub.find( {studentsSub: req.studentsSub}).sort( { date: -1 });
        res.json(studentsSub);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// POST api/students - Do subscription -  Private access
router.post(
    '/', 
    [ auth, [
        check('being', 'Purpose of payment required').not().isEmpty(),
        check('amount', 'Amount is required').not().isEmpty()
    ], 
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const  { being, amount } = req.body;

    try {
        const newStudentsSub = new StudentsSub ({
            being,
            amount, 
            user: req.user.id
        });

        const studentsSub = await newStudentsSub.save();

        res.json(studentsSub);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   PUT api/studentsSub/:id - Update studentsSub - Private access
router.put('/:id', auth, async (req, res) => {
    const { amount, being } = req.body;

    // Build a studentsSub object
    const studentsSubFields = {};
    if(amount) studentsSubFields.amount = amount;
    if(being) studentsSubFields.being = being;
    
    try {
        let studentsSub = await studentsSub.findById(req.params.id);
        
        if (!studentsSub) return res.status(404).json( { msg: 'studentsSub not Found' });

        // Make sure user own the studentsSub
        if (studentsSub.user.toString() !== req.user.id ) {
            return res.status(401).json( {msg: 'Not authorized' });
        }

        studentsSub = await studentsSub.findByIdAndUpdate(req.params.id,
            { $set: receiptFields },
            { new: true });

            res.json(studentsSub);
    } catch (err) {
        console.error.error(err.message);
        res.status(500).send('Server Error')
    }

});

// @route   DELETE api/recipts/:id - Delete studentsSub - Private access
router.delete('/:id', auth, async (req, res) => {
    res.send('Delete studentsSub');

    try {
        let studentsSub = await studentsSub.findById(req.params.id);
        
        if (!studentsSub) return res.status(404).json( { msg: 'studentsSub not Found' });

        // Make sure user own the studentsSub
        if (studentsSub.user.toString() !== req.user.id ) {
            return res.status(401).json( {msg: 'Not authorized' });
        }

        await studentsSub.findByIdAndRemove(req.params.id);

            res.json({ msg: 'studentsSub removed' });
    } catch (err) {
        console.error.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;