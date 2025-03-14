const event = require("../Models/event");
const user = require("../Models/user");
const multer = require("multer");

//^for images storing
const Storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads/');
    },
    filename  :function(req,file,cb) {
        cb(null . Date.now()  + path.extname(file.originalname));
    }
});
const upload = multer({storage : Storage});


//!ADDEVENT
const addEvent = async (req,res) => {
    
    try {
    const {title,domain,description,prize,startdate,enddate,location} = req.body;
    const image = req.file ? req.file.filename : undefined ;
    const User = await user.findById(req.user);
    
    const checktitle = await event.findOne({title});
    if(checktitle){
        return res.status(400).json({message : "Same titles detected add an different title!!"});
    }


    if(!User){
        return res.status(404).json({error : "User not found !!"});
    }

    const Event = new event({
      title,
      domain,
      description,
      prize,
      startdate,
      enddate,
      location,
      image,
    });


       // If the user is an organizer, associate the event with the user
    if (User.role === "organizer") {
        Event.user = User._id;
        User.event.push(Event);
        await User.save();
    }
    await Event.save();


    return res.status(200).json({message :"Event added successfully!!"});
        
    } catch (error) {
        return res.status(500).json({
            message : "cannot save an event",
            err : error
        })
        
    }
}

//! Delete an event
const deleteEvent = async (req,res) => {
     const eventId = req.params.id;
     try{
        const deleteditem  = await event.findByIdAndDelete(eventId);
        if(!deleteditem){
            res.status(404).json({
                status  : "failed",
                message : "Product not found"
            });
        }
     //^ Deleting record from the user
        await user.updateMany(
            { event: eventId }, // Assuming 'events' is an array of event IDs in User schema
            { $pull: { event: eventId } } // Pull the deleted event ID from the array
        );


        res.status(200).json({
            message : "deleted successfully"
        });
     } 
     catch(err){
        res.status(500).json({
            status : "failed",
            err  
        })
     }
};

module.exports = {addEvent : [upload.single('image'),addEvent] , deleteEvent};