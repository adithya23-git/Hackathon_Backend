const usercontroller = require("../controllers/usercontroller");
const express = require("express");
const router = express.Router();

router.post('/register' , usercontroller.registeruser);
router.post('/login' , usercontroller.login);

router.get('/getallusers' , usercontroller.getallusers);
router.get('/getanuser/:id' , usercontroller.getanuser);

module.exports = router;