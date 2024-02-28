const express = require('express');
const Blog = require('../models/BlogSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Get All the Blogs using: GET "/api/blogs/fetchallblogs". Login required
router.get('/fetchallblogs',fetchuser,async (req,res)=>{
    try {
        const blogs = await Blog.find({user:req.user.id});
        res.json(blogs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Blog using: POST "/api/blog/addblog". Login required

router.post('/addblog', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
        try {
            const { title, description, image } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newBlog = new Blog({
                title, description, image, user: req.user.id
            })
            const savedBlog = await newBlog.save()

            res.json(savedBlog)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 3: Update an existing blog using: PUT "/api/notes/updateblog". Login required
router.put('/updateblog/:id', fetchuser, async (req, res) => {
    const { title, description, image } = req.body;
    try {
        // Create a newBlog object
        const newBlog = {};
        if(title){newBlog.title = title};
        if (description) { newBlog.description = description };
        if (image) { newBlog.image = image };

        // Find the note to be updated and update it
        let blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).send("Not Found")
        }
        if(blog.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed");
        }

        blog = await Blog.findByIdAndUpdate(req.params.id,{$set:newBlog},{new:true});
        res.json(blog);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 4: Delete an existing blog using: DELETE "/api/notes/deleteblog". Login required
router.delete('/deleteblog/:id',fetchuser,async (req,res)=>{
    try {
        // Find the note to be delete and delete it
        let blog = await Blog.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        blog = await Blog.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", blog: blog });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})





module.exports = router;