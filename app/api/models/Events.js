const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    Tittle: {
        type: String,
        trim: true,
        required: true,
    },
    created_on: {
        type: Date,
        trim: true,
        required: true
    },
    Description: {
        type: String,
        trim: true,
        required: true
    },
    Eventlocation: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    Tags: {
        type: [String],
        trim: true,
        required: false
    },
    radius: {
        type: Number,
        trim: true,
        required: true
    },
    UserProfileID: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Event', EventSchema)