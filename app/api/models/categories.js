const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const catSchema = new Schema({
    catId: {
        type: String,
        trim: true,
        required: false,
    },
    catName: {
        type: String,
        trim: true,
        required: false
    }
});
module.exports = mongoose.model('categories', catSchema)