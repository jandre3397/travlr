var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel'); // ✅ Import travel controller

/* GET travel page */
router.get('/', controller.travel); // ✅ Route to serve travel page

module.exports = router;
