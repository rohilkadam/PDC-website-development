const express = require('express');
const Service = require('../models/ServiceSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// ROUTE 1: Get All the Blogs using: GET "/api/blogs/fetchallblogs". Login required
router.get('/fetchallservices',async (req,res)=>{
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/fetchservice/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
// ROUTE 2: Add a new Blog using: POST "/api/blog/addblog". Login required

router.post('/addservice', fetchuser,upload.single("image"), [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path);
            const image = result.secure_url;
            const { name, description , servicetype} = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newService = new Service({
                name, description, image, servicetype
            })
            console.log(newService);
            const savedService = await newService.save()

            res.json(savedService)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 3: Update an existing blog using: PUT "/api/notes/updateblog". Login required
router.put('/updateservice/:id', fetchuser, async (req, res) => {
    const { name, description, image } = req.body;
    try {
        // Create a newBlog object
        const newService = {};
        if(name){newService.name = name};
        if (description) { newService.description = description };
        if (servicetype) { newService.servicetype = servicetype};
        if (image) { newService.image = image };

        // Find the note to be updated and update it
        let service = await Service.findById(req.params.id);
        if(!service){
            return res.status(404).send("Not Found")
        }
        if(service.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed");
        }

        service = await Service.findByIdAndUpdate(req.params.id,{$set:newService},{new:true});
        res.json(service);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 4: Delete an existing blog using: DELETE "/api/notes/deleteblog". Login required
router.delete('/deleteservice/:id',fetchuser,async (req,res)=>{
    try {
        // Find the note to be delete and delete it
        let service = await Service.findById(req.params.id);
        if (!service) { return res.status(404).send("Not Found") }


        service = await Service.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Blog has been deleted", service: service });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})





module.exports = router;