const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
router.post('/register', userController.create);
router.post('/updatePassword',userController.updatePassword)
router.post('/authenticate', userController.authenticate);
router.post('/createProfile',userController.createProfile);
router.post('/publicProfile',userController.publicProfile);
module.exports = router;