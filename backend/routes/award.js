const express = require('express');
const Award = require('../models/AwardSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(upload.single('image'));

router.get('/fetchallawards',async (req,res)=>{
    try {
        const awards = await Award.find({});
        res.json(awards);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/fetchaward/:id', async (req, res) => {
    try {
        const award = await Award.findById(req.params.id);
        if (!award) {
            return res.status(404).json({ msg: 'Award not found' });
        }
        res.json(award);
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


// ROUTE: Update an existing award including image upload
router.put('/updateaward/:id', async (req, res) => {
    const { name, issuedBy, description } = req.body;
    let imageUrl = null;

    // Check if an image file was uploaded
    if (req.file) {
        try {
            // Upload image to Cloudinary if a new image is uploaded
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return res.status(500).json({ msg: 'Error uploading image' });
        }
    }

    try {
        // Find the award to be updated
        let award = await Award.findById(req.params.id);
        if (!award) {
            return res.status(404).json({ msg: 'Award not found' });
        }

        // Update award details including the image URL if a new image was uploaded
        award.name = name;
        award.issuedBy = issuedBy;
        award.description = description;
        if (imageUrl) {
            award.image = imageUrl; // Update image URL only if a new image was uploaded
        }

        // Save updated award to the database
        const updatedAward = await award.save();

        res.json(updatedAward); // Respond with the updated award object
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
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