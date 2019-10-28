const eventModel = require('../models/Events');
module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        eventModel.findById(req.params.eventId, function (err, eventInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Event found!!!",
                    data: {
                        event: eventInfo
                    }
                });
            }
        });
    },
    getAll: function (req, res, next) {
        let eventsList = [];
        eventModel.find({}, function (err, events) {
            if (err) {
                next(err);
            } else {
                for (let event of events) {
                    eventsList.push({
                        id: event._id,
                        Tittle: event.Tittle,
                        created_on: event.created_on,
                        Description:event.Description,
                        Eventlocation:event.Eventlocation,
                        category:event.category,
                        tags:event.Tags,
                        UserProfileID:event.UserProfileID
                    });
                }
                res.json({
                    status: "success",
                    message: "Events list found!!!",
                    data: {
                        events: eventsList
                    }
                });

            }
        });
    },
    updateById: function (req, res, next) {
        eventModel.findByIdAndUpdate(req.params.eventId, {
            Tittle: req.body.tittle
        }, function (err, eventInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "Event updated successfully!!!",
                    data: null
                });
            }
        });
    },
    deleteById: function (req, res, next) {
        eventModel.findByIdAndRemove(req.params.eventId, function (err, eventInfo) {
            if (err)
                next(err);
            else {
                res.json({
                    status: "success",
                    message: "Event deleted successfully!!!",
                    data: null
                });
            }
        });
    },
    create: function (req, res, next) {
        eventModel.create({
            Tittle:req.body.tittle,
            created_on:req.body.created_on,
            Description:req.body.description,
            Eventlocation:req.body.EventLocation,
            category:req.body.category,
            Tags:req.body.tags,
            radius:req.body.radius,
            UserProfileID:req.body.ProfileID
        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "Event created successfully!!!",
                    data: result
                });

        });
    },
}