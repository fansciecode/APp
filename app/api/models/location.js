const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    loction: {
        type: JSON,
        default :{
            latitude: String,
            longitude :String
        },
        trim: false,
        required: false,
     }
});
module.exports = mongoose.model('LocationSchema', LocationSchema);