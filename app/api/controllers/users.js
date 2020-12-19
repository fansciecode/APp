const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

module.exports = {
    create: function (req, res, next) {
        function randNumb(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        userModel.create({
            name: req.body.name,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            dateofBirth: req.body.dateofBirth,
            OTP: randNumb(1000, 10000)
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "User added successfully!!!",
                    data: null
                });

        });
    },
    createProfile: function (req, res, next) {
        userModel.updateOne({
            _id: req.body.user_id
        }, {
            $set: {
                userProfile: {
                    about: req.body.userProfile.about,
                    socailprofilelink: req.body.userProfile.socailprofilelink,
                    location: req.body.userProfile.location,
                    eDuBackground: req.body.userProfile.eDuBackground,
                    workBackround: req.body.userProfile.workBackround,
                    imgUrl: req.body.userProfile.imgUrl,
                    interestsCat: req.body.userProfile.interestsCat,
                }
            }
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "user profile updated successfully!!!",
                    data: null
                });
        });
    },
    publicProfile: function (req, res, next) {
        userModel.findById(req.body.user_id, function (err, response) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "User Profile available!!!",
                    data: {
                        name: response.name,
                        imgUrl: response.userProfile.imgUrl,
                        about: response.userProfile.about,
                        location: response.userProfile.location,
                        profession: response.userProfile.workBackround,
                        education: response.userProfile.eDuBackground,
                        socailprofilelink: response.userProfile.socailprofilelink
                    }
                });
            }

        });


    },

    updatePassword: function (req, res, next) {
        userModel.updateOne({
            _id: req.body.user_id
        }, {
            $set: {
                "password": bcrypt.hashSync(req.body.password, saltRounds)
            }
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "password updated successfully!!!",
                    data: null
                });

        });
    },
    authenticate: function (req, res, next) {
        userModel.findOne({
            email: req.body.email
        }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({
                        id: userInfo._id
                    }, req.app.get('secretKey'), {
                        expiresIn: '1h'
                    });
                    res.json({
                        status: "success",
                        message: "user found!!!",
                        data: {
                            user: userInfo,
                            token: token
                        }
                    });
                } else {
                    res.json({
                        status: "error",
                        message: "Invalid email/password!!!",
                        data: null
                    });
                }
            }
        });
    },
}