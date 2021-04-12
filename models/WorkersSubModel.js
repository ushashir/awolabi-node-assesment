const mongoose = require('mongoose');
const Schema = mongoose.Schema

const WorkersSubcriptionSchema = new Schema({

    daily: {
        type: Number,
        default: '1000'
    },
    weekly: {
        type: Number,
        default: '3000'
    },
    monthly: {
        type: Number,
        default: '5000'
    },
    yearly: {
        type: Number,
        default: '8000'
    }
    
    subscriptionDate: {
        type: Date,
        default: Date.now 
    },
     
})
module.exports = mongoose.model('workersSubcription', WorkersSubcriptionSchema)
