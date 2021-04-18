const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const WorkersSub = require('../models/WorkersSub')

// GET api/students  - view subscription history - Private access (only admin)
router.get('/', auth,  async (req, res) => { 
    try {
        const workersSub = await WorkersSub.find( {workersSub: req.workersSub}).sort( { date: -1 });
        res.json(workersSub);
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
        const newStudentsSub = new WorkersSub ({
            being,
            amount, 
            user: req.user.id
        });

        const workersSub = await newStudentsSub.save();

        res.json(workersSub);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   PUT api/workersSub/:id - Update workersSub - Private access
router.put('/:id', auth, async (req, res) => {
    const { amount, being } = req.body;

    // Build a workersSub object
    const studentsSubFields = {};
    if(amount) studentsSubFields.amount = amount;
    if(being) studentsSubFields.being = being;
    
    try {
        let workersSub = await workersSub.findById(req.params.id);
        
        if (!workersSub) return res.status(404).json( { msg: 'workersSub not Found' });

        // Make sure user own the workersSub
        if (workersSub.user.toString() !== req.user.id ) {
            return res.status(401).json( {msg: 'Not authorized' });
        }

        workersSub = await workersSub.findByIdAndUpdate(req.params.id,
            { $set: receiptFields },
            { new: true });

            res.json(workersSub);
    } catch (err) {
        console.error.error(err.message);
        res.status(500).send('Server Error')
    }

});

// @route   DELETE api/recipts/:id - Delete workersSub - Private access
router.delete('/:id', auth, async (req, res) => {
    res.send('Delete workersSub');

    try {
        let workersSub = await workersSub.findById(req.params.id);
        
        if (!workersSub) return res.status(404).json( { msg: 'workersSub not Found' });

        // Make sure user own the workersSub
        if (workersSub.user.toString() !== req.user.id ) {
            return res.status(401).json( {msg: 'Not authorized' });
        }

        await workersSub.findByIdAndRemove(req.params.id);

            res.json({ msg: 'workersSub removed' });
    } catch (err) {
        console.error.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;