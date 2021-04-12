const mongoose = require('mongoose');
const Schema = mongoose.Schema

const StudentsSubcriptionSchema = new Schema({

    daily: {
        type: Number,
        default: '500'
    },
    weekly: {
        type: Number,
        default: '1500'
    },
    monthly: {
        type: Number,
        default: '2500'
    },
    yearly: {
        type: Number,
        default: '4000'
    }
    subscriptionDate: {
        type: Date,
        default: Date.now 
    },
     
})
module.exports = mongoose.model('studentsSubcription', StudentsSubcriptionSchema)
