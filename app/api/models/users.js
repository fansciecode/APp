const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    mobileNumber: {
        type: String,
        trim: false,
        required: true,
    },
    dateofBirth: {
        type: String,
        trim: false,
        required: true,

    },
    OTP: {
        type: String,
        trim: false,
        required: true
    },
    password: {
        type: String,
        trim: false,
        required: false
    },
    userProfile:{
        type: JSON,
        default : {
            about : String, required :true,
            socailprofilelink : String, required: true,
            location : String,required: true,
            eDuBackground : String,required: true,
            workBackround : String,required: true,
            imgUrl :String ,required : true ,
            interestsCat : {
                catId : [String], required :true,
            },required :true
        },
        trim:false,
        required:false
    }

    
});

// hash user password before saving into database
// UserSchema.pre('save', function (next) {
//     this.password = bcrypt.hashSync(this.password, saltRounds);
//     next();
// });
module.exports = mongoose.model('User', UserSchema);