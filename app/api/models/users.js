const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: false,
    },
    email: {
        type: String,
        trim: true,
        required: false
    },
    mobileNumber: {
        type: String,
        trim: false,
        required: false,
    },
    dateofBirth: {
        type: String,
        trim: false,
        required: false,

    },
    OTP: {
        type: String,
        trim: false,
        required: false
    },
    password: {
        type: String,
        trim: false,
        required: false
    },
    userProfile:{
        type: JSON,
        default : {
            about : String, required :false,
            socailprofilelink : String, required: false,
            location : String,required: false,
            eDuBackground : String,required: false,
            workBackround : String,required: false,
            imgUrl :String ,required : false ,
            interestsCat : {
                catId : [String], required :false,
            },required :false
        },
        trim:false,
        required:false
    },
    EventsHosted:{
        type:Number,
        required:false
    },
    EventsAttened:{
        type:Number,
        required:false
    },
    Reportcount :{
        type:Number,
        required:false
    }

    
});

// hash user password before saving into database
// UserSchema.pre('save', function (next) {
//     this.password = bcrypt.hashSync(this.password, saltRounds);
//     next();
// });
module.exports = mongoose.model('User', UserSchema);