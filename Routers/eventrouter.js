const express = require("express");
const eventcontroller = require("../controllers/eventcontroller");
const verifytoken  = require("../Middlewares/VerifyToken");
const router = express.Router();

router.post("/addevent" , verifytoken.VerifyToken , eventcontroller.addEvent);
router.delete("/deleteevent/:id" , eventcontroller.deleteEvent);

//^Get an images

router.get("/uploads/:imgName" , (req,res) => {
    const imageName = req.params.imgName;
    res.headersSent('Content-Type' , 'image/jpeg');
    res.sendFile(path.join(__dirname)  , ".." , "uploads" , imageName);
})

module.exports = router;