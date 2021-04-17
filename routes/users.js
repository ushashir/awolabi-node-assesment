const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const UserModel = require('../models/User');


// @route   POST api/users, Register a users; access   Public

router.post('/', [
    check('userName', 'Please add user name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with six or more characters').isLength({ min: 5 })
    ], 

  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const  { userName, firstName, lastName, email, password, phoneNo, dateOfBirth, dateOfRegistration, userCategory } =  req.body;
    
    try {
        let user = await User.findOne( { email });

        if (user) {
            return res.status(400).json({ msg: 'User already exist'})
        }
        
        user = new User({
            userName,
            firstName,
            lastName,
            email,
            password,
            phoneNo,
            dateOfBirth,
            dateOfRegistration,
            userCategory
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            } 
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        }); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')  
    }
   }
  );

module.exports = router;
