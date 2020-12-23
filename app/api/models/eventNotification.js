const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
    eventId: {
        type: String,
        trim: true,
        required: false,
    },
    fromdeviceId :{
        type: String,
        trim: true,
        required: false,
    },
    toDeviceId :{
        type: String,
        trim: true,
        required: false,
    },
    fromProfileId: {
        type: String,
        trim: true,
        required: false
    },
    toProfileId: {
        type: String,
        trim: true,
        required: false
    },
    status: {
        type: Boolean,
        required: false
    },
    MessageStatus:{
        tyepe:Boolean,
        required:false
    }
});
module.exports = mongoose.model('Notify', NotificationSchema)