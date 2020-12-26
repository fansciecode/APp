const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    tittle: {
        type: String,
        trim: true,
        required: false,
    },
    imgUrl :{
        type: String,
        trim: true,
        required: false,
    },
    contactInfo :{
        type: String,
        trim: true,
        required: false,
    },
    event_date: {
        type: Date,
        trim: true,
        required: false
    },
    created_on: {
        type: Date,
        trim: true,
        required: false
    },
    Description: {
        type: String,
        trim: true,
        required: false
    },
    guideLines: {
        type: String,
        trim: true,
        required: false
    },
    Eventlocation: {
        type: String,
        trim: true,
        required: false
    },
    City :{
        type: String,
        trim:false ,
        required: false
    },
    locationCorodiantes :{
        type :JSON,
        default :{
            latitude :String,
            longitude :String
        },
        required:false
    },
    event_category: {
        type: [String],
        trim: true,
        required: false
    },
    Tags: {
        type: [String],
        trim: true,
        required: false
    },
    UserProfileID: {
        type: String,
        trim :false,
        required: false
    },
    aditionalImgOrVideo: {
        type: [String],
        trim :false,
        required: false
    },
    JoinCount:{
        type:Number,
        required:false
    },
    reportCount:{
        type:Number,
        required:false
    },
    MaxCapacity:{
        type:Number,
        required:false
    }
});
module.exports = mongoose.model('Event', EventSchema)