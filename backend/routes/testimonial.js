const express = require('express');
const Testimonial = require('../models/TestimonialSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Get All the Testimonials using: GET "/api/testimonials/fetchalltestimonials". Login required
router.get('/fetchalltestimonials',fetchuser,async (req,res)=>{
    try {
        const testimonials = await Testimonial.find({user:req.user.id});
        res.json(testimonials);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Testimonial using: POST "/api/testimonial/addtestimonial". Login required

router.post('/addtestimonial', fetchuser, [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('feedback', 'Feedback must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
        try {
            const { name, feedback, image } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newtestimonial = new Testimonial({
                name, feedback, image, user: req.user.id
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
router.put('/updatetestimonial/:id', fetchuser, async (req, res) => {
    const { name, feedback, image } = req.body;
    try {
        // Create a newTestimonial object
        const newTestimonial = {};
        if(name){newTestimonial.name = name};
        if (feedback) { newTestimonial.feedback = feedback };
        if (image) { newTestimonial.image = image };

        // Find the note to be updated and update it
        let testimonial = await Testimonial.findById(req.params.id);
        if(!testimonial){
            return res.status(404).send("Not Found")
        }
        if(testimonial.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed");
        }

        testimonial = await Testimonial.findByIdAndUpdate(req.params.id,{$set:newTestimonial},{new:true});
        res.json(testimonial);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 4: Delete an existing testimonial using: DELETE "/api/notes/deletetestimonial". Login required
router.delete('/deletetestimonial/:id',fetchuser,async (req,res)=>{
    try {
        // Find the note to be delete and delete it
        let testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (testimonial.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        testimonial = await Testimonial.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", testimonial: testimonial });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})





module.exports = router;