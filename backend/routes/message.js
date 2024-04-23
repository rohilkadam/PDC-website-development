const express = require('express');
const Message = require('../models/MessageSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/fetchallmessages',async (req,res)=>{
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.post('/sendmessage', async (req, res) => {
        try {
            const { name, email, subject, message  } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newMessage = new Message({
                name, email, subject, message 
            })
            const savedMessage= await newMessage.save()

            res.json(savedMessage)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

router.delete('/deletemessage/:id',async (req,res)=>{
    try {
        // Find the note to be delete and delete it
        let message = await Message.findById(req.params.id);
        if (!message) { return res.status(404).send("Not Found") }

        
        message = await Message.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Messsage has been deleted", message: message });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;