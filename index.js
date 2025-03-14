const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

//!Routing
const userroute = require("./Routers/userroute");
const eventroute = require("./Routers/eventrouter");

const app = express();
dotenv.config();
app.use(cors());

//! Home
app.use("/" , (req,res) => {
    res.send("<h1> This is an hackathon event page");
})

mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("MONGO DB Successfully Connected ✅"))
   .catch((error) => console.log(error));

//!Middlewares
app.use(bodyParser.json()); //^ Used for converting data into js object
app.use("/", userroute); //* USER ROUTE
app.use("/event" , eventroute); //* Event router
app.use('/uploads' , express.static('uploads')); //* Serves images 

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`App listening on port : ${PORT}`);
})