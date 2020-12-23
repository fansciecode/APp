const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
router.post('/register', userController.create);
router.post('/updatePassword',userController.updatePassword)
router.post('/authenticate', userController.authenticate);
router.post('/createProfile',userController.createProfile);
router.post('/publicProfile',userController.publicProfile);
router.post('/JoinEvent',userController.JoinEvent);
router.post('/createchat',userController.CreateChat);
router.post('/ChatMessage',userController.ChatMessage);
router.post('/JoinChat',userController.JoinChat);
router.post('/notifcationReponse',userController.notifcationReponse)
module.exports = router;