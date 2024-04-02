const express = require('express');
const Testimonial = require('../models/TestimonialSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");


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
    const { name, image, feedback } = req.body;
    try {
        // Create a newTestimonial object
        const newTestimonial = {};
        if(name){newTestimonial.name = name};
        if (image) { newTestimonial.image = image };
        if (feedback) { newTestimonial.feedback = feedback };
        

        // Find the note to be updated and update it
        let testimonial = await Testimonial.findById(req.params.id);
        if(!testimonial){
            return res.status(404).send("Not Found")
        }
        

        testimonial = await Testimonial.findByIdAndUpdate(req.params.id,{$set:newTestimonial},{new:true});
        res.json(testimonial);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
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