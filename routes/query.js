const express =require("express");
const router = express.Router();

const QueryController = require('../app/api/controllers/query');

router.get('/tags/:tag',QueryController.EventByTag);
router.get('/location/:location', QueryController.EventByLocation);
router.get('/category/:category',QueryController.EventByCategory);
// router.get('/location&category')
module.exports= router;