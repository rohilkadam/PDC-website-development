const express = require('express');
const Testimonial = require('../models/TestimonialSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");


router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(upload.single('image'));

// ROUTE 1: Get All the Testimonials using: GET "/api/testimonials/fetchalltestimonials". Login required
router.get('/fetchalltestimonials',async (req,res)=>{
    try {
        const testimonials = await Testimonial.find({});
        res.json(testimonials);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Testimonial using: POST "/api/testimonial/addtestimonial". Login required

router.post('/addtestimonial',upload.single("image"), [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('feedback', 'Feedback must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path);
            const { name, feedback } = req.body;
            const image = result.secure_url;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newTestimonial = new Testimonial({
                name, image, feedback
            })
            const savedTestimonial = await newTestimonial.save()

            res.json(savedTestimonial)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 3: Update an existing testimonial using: PUT "/api/notes/updatetestimonial". Login required
router.put('/updatetestimonial/:id', async (req, res) => {
    const { name, feedback } = req.body;
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
        let testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ msg: 'Testimonial not found' });
        }

        // Update award details including the image URL if a new image was uploaded
        testimonial.name = name;
        testimonial.feedback = feedback;
        
        if (imageUrl) {
            testimonial.image = imageUrl; // Update image URL only if a new image was uploaded
        }   

        // Save updated award to the database
        const updatedTestimonial = await testimonial.save();

        res.json(updatedTestimonial); // Respond with the updated award object
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE 4: Delete an existing testimonial using: DELETE "/api/notes/deletetestimonial". Login required
router.delete('/deletetestimonial/:id',async (req,res)=>{
    try {
        // Find the note to be delete and delete it
        let testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) { return res.status(404).send("Not Found") }

        
        testimonial = await Testimonial.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", testimonial: testimonial });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})





module.exports = router;