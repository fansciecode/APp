const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    tittle: {
        type: String,
        trim: true,
        required: true,
    },
    imgUrl :{
        type: String,
        trim: true,
        required: true,
    },
    contactInfo :{
        type: String,
        trim: true,
        required: false,
    },
    event_date: {
        type: Date,
        trim: true,
        required: true
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
    guideLines: {
        type: String,
        trim: true,
        required: true
    },
    Eventlocation: {
        type: String,
        trim: true,
        required: true
    },
    City :{
        type: String,
        trim:false ,
        required: true
    },
    locationCorodiantes :{
        type :JSON,
        default :{
            latitude :String,
            longitude :String
        },
        required:true
    },
    event_category: {
        type: [String],
        trim: true,
        required: true
    },
    Tags: {
        type: [String],
        trim: true,
        required: false
    },
    UserProfileID: {
        type: String,
        trim :false,
        required: true
    },
    aditionalImgOrVideo: {
        type: [String],
        trim :false,
        required: true
    }
});
module.exports = mongoose.model('Event', EventSchema)