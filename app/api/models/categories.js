const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const catSchema = new Schema({
    catId: {
        type: String,
        trim: true,
        required: true,
    },
    catName: {
        type: String,
        trim: true,
        required: true
    }
});
module.exports = mongoose.model('categories', catSchema)