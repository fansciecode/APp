const userModel = require('../models/users');
const notify = require('../models/eventNotification');
const message = require('../models/Messages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var firebase = require('firebase');

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
                    data: result
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
                    data: result
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
    JoinEvent: function (req, res, next) {
     var   EventId =req.body.eventId;
      var  FromdeviceId =req.body.fromdeviceId;
       var ToDeviceId = req.body.toDeviceId;
       var FromProfileId = req.body.fromProfileId;
      var  ToProfileId = req.body.toProfileId;

        notify.create({
                eventId: EventId,
                fromdeviceId: FromdeviceId,
                toDeviceId: ToDeviceId,
                fromProfileId: FromProfileId,
                toProfileId: ToProfileId
            },
            function (err, response) {

                if (err)
                    next(err);
                else {

                    firebase.database().ref('/Notifications').set({eventID:EventId,fromProfileId:FromProfileId,
                        fromdeviceId:FromdeviceId,toDeviceId:ToDeviceId,toProfileId:ToProfileId});
                    res.json({

                        status: "success",
                        message: "Join event request subbmitted !!",
                        data: response

                    })
                }

            })

    },
    notifcationReponse: function (req, res, next) {
        var noitiyId = req.body.notificationID;
        var status = req.body.status;
        var messagestatus = status ? 1 : 0;
        notify.updateOne({
            _id: noitiyId
        }, {
            $set: {
                status: status,
                MessageStatus: messagestatus
            }
        }, function (err, response) {
            if (err)
                next(err)
            else {
                firebase.database().ref('/NotificationsResponse').set({notificationId:noitiyId,Status:status,
                    messageStatus:messagestatus });
                res.json({
                    status: "success",
                    message: "notification updated succefully",
                    data: response
                })
            }


        })

    },
    CreateChat: function (req, res, next) {
        var EventId = req.body.EventID;
        var senderId = req.body.senderID;
        var isGroupmessage = (req.body.isgroupMessage ) ? 1:0 ;
        var participantsIds = req.body.participantIDs;

        message.create({
                eventID: EventId,
                sender: senderId,
                is_group_message: isGroupmessage,
                participants: participantsIds
            },
            function (err, response) {
                if (err)
                    next(err)
                else {
                    firebase.database().ref('/createChat').set({eventID:EventId,sender:senderId,
                        is_group_message: isGroupmessage,participants:{user:participantsIds}});

                    res.json({
                        status: "success",
                        Message: "chat created successfully",
                        data: response

                    })
                }
            })


    },

    JoinChat: function (req, res, next) {
        var ChatID = req.body.ChatID;
        var UserID = req.body.userID;
        messages.update({
            _id: ChatID
        }, {
            $push: {
                participants: {
                    user: UserID
                }
            }
        }, function (err, response) {
            if (err)
                next(err)
            else {
                res.json({
                    status: "success",
                    Message: "Joined Chat successfully",
                    data: response
                })
            }

        })
    },
    ChatMessage: function (req, res, next) {
        var chatID = req.body.ChatID;
        var EventID =req.body.eventId;
        var senderID = req.body.senderID;
        var touserID =req.body.toUserID;
        var messagedetails = req.body.message;

        message.update({
            _id: chatID
        }, {
            $push: {
                messages: {
                    message: messagedetails,
                    meta: {
                        user: senderID,
                        delivered: false
                    }
                }
            }
        }, function (err, response) {
            if (err)
                next(err)
            else {
                firebase.database().ref('/chatMessages').set({eventID:EventID,ChatID:chatID,sender:senderID,
                   messages: {message:messagedetails,user:touserID}});

                res.json({
                    status: "success",
                    Message: "message Sent succefully",
                    data: response
                })
            }

        })


    },
    updatePassword: function (req, res, next) {
        userModel.updateOne({
            _id: req.body.user_id
        }, {
            $set: {
                password: bcrypt.hashSync(req.body.password, saltRounds)
            }
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "password updated successfully!!!",
                    data: result
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
                        message: "Invalid email/password!!!"

                    });
                }
            }
        });
    },
}