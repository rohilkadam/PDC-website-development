const express = require('express');
const Award = require('../models/AwardSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Get All the Awards using: GET "/api/awards/fetchallawards". Login required
router.get('/fetchallblogs',fetchuser,async (req,res)=>{
    try {
        const awards = await Award.find({user:req.user.id});
        res.json(awards);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Award using: POST "/api/award/addaward". Login required

router.post('/addaward', fetchuser, [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
        try {
            const { name, description, image } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newAward = new Award({
                name, description, image, user: req.user.id
            })
            const savedAward = await newAward.save()

            res.json(savedAward)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 3: Update an existing award using: PUT "/api/notes/updateaward". Login required
router.put('/updateaward/:id', fetchuser, async (req, res) => {
    const { name, description, image } = req.body;
    try {
        // Create a newAward object
        const newAward = {};
        if(name){newAward.name = name};
        if (description) { newAward.description = description };
        if (image) { newAward.image = image };

        // Find the note to be updated and update it
        let award = await Award.findById(req.params.id);
        if(!award){
            return res.status(404).send("Not Found")
        }
        if(award.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed");
        }

        award = await Award.findByIdAndUpdate(req.params.id,{$set:newAward},{new:true});
        res.json(award);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 4: Delete an existing award using: DELETE "/api/notes/deleteaward". Login required
router.delete('/deleteaward/:id',fetchuser,async (req,res)=>{
    try {
        // Find the note to be delete and delete it
        let award = await Award.findById(req.params.id);
        if (!award) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (award.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        award = await Award.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", award: award });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})





module.exports = router;