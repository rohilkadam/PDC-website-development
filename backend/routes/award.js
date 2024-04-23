const express = require('express');
const Award = require('../models/AwardSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// ROUTE 1: Get All the Awards using: GET "/api/award/fetchallawards". Login required
router.get('/fetchallawards',async (req,res)=>{
    try {
        const awards = await Award.find({});
        res.json(awards);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Award using: POST "/api/award/addaward". Login required

router.post('/addaward',fetchuser, upload.single("image"), [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
        try {
            console.log(req.body);
            const result = await cloudinary.uploader.upload(req.file.path);
            const image = result.secure_url;
            const { name, issuedBy, description } = req.body;
           // console.log(name);
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newAward = new Award({
                name,issuedBy, description, image
            })
            console.log(newAward);
            const savedAward = await newAward.save();

            res.json(savedAward);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 3: Update an existing award using: PUT "/api/notes/updateaward". Login required
router.put('/updateaward/:id', async (req, res) => {
    const { name,issuedBy, description, image } = req.body;
    try {
        // Create a newAward object
        const newAward = {};
        if(name){newAward.name = name};
        if (issuedBy) { newAward.issuedBy = issuedBy };
        if (description) { newAward.description = description };
        if (image) { newAward.image = image };

        // Find the note to be updated and update it
        let award = await Award.findById(req.params.id);
        if(!award){
            return res.status(404).send("Not Found")
        }
        

        award = await Award.findByIdAndUpdate(req.params.id,{$set:newAward},{new:true});
        res.json(award);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 4: Delete an existing award using: DELETE "/api/notes/deleteaward". Login required
router.delete('/deleteaward/:id',async (req,res)=>{
    try {
        // Find the note to be delete and delete it
        let award = await Award.findById(req.params.id);
        if (!award) { return res.status(404).send("Not Found") }

        
        award = await Award.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", award: award });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})





module.exports = router;