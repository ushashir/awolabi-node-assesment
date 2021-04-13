const UserModel = require('../models/UserModel');

module.exports = {

    // user registration routes public
    register: (req, res) => {
        let user = new UserModel({
        const { firstName, lastName, email, password, dateOfBirth, userCategory  } = req.body;  
      
        })
        user.save()
        .then(result => {
            res.json({ success: true, result: result})
        })
        .catch(err => {
             res.json({ success: false, result: err})
            })
    },

    update: (req, res) => {
    UserModel.update({_id: req.body._id}, req.body)
    .then(user => {
        if (!user) res.json({ success: false, result: "No such user exists"})
      
        res.json(user)
    })
      .catch(err => {
          res.json({ success: false, result: err})
      })
    },

    retrieve: (req, res) => {
        UserModel.find()
        .then(user => {
            if (!user) res.json({ success: false, result: "No parks found"})

            res.json({ sucess: true, result: result})
        })
        .catch(err => {
            res.json({ success: false, result: err})
        })
    },

    delete: (req, res) => {
        UserModel.remove({ _id: req.body._id})
        .then(user => {
            if (!user) res.json({ success: false, result: "No user with such ID was found" })
            res.json({ success: true, result: result })
        })
        .catch(err => res.json({success: false, result: err}))
    }
}