const express = require('express');
const Blog = require('../models/BlogSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// ROUTE 1: Get All the Blogs using: GET "/api/blogs/fetchallblogs". Login required
router.get('/fetchallblogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/fetchblog/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Blog using: POST "/api/blog/addblog". Login required
router.post('/addblog', fetchuser, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]), [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
], async (req, res) => {
    try {
        // Uploading image to Cloudinary
        const imageResult = await cloudinary.uploader.upload(req.files['image'][0].path);
        const imageUrl = imageResult.secure_url;

        // Uploading PDF to Cloudinary
        const pdfResult = await cloudinary.uploader.upload(req.files['file'][0].path);
        const pdfUrl = pdfResult.secure_url;

        const { title } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newBlog = new Blog({
            title,
            image: imageUrl,
            file: pdfUrl // Assuming the field in the Blog model is named "pdf" for storing PDF URL
        });

        const savedBlog = await newBlog.save();

        res.json(savedBlog);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
// ROUTE 3: Update an existing blog using: PUT "/api/notes/updateblog". Login required
router.put('/updateblog/:id', fetchuser, async (req, res) => {
    const { title, description, image } = req.body;
    try {
        // Create a newBlog object
        const newBlog = {};
        if (title) { newBlog.title = title };
        if (description) { newBlog.description = description };
        if (image) { newBlog.image = image };

        // Find the note to be updated and update it
        let blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("Not Found")
        }
        if (blog.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        blog = await Blog.findByIdAndUpdate(req.params.id, { $set: newBlog }, { new: true });
        res.json(blog);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 4: Delete an existing blog using: DELETE "/api/notes/deleteblog". Login required
router.delete('/deleteblog/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let blog = await Blog.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }


        blog = await Blog.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Blog has been deleted", blog: blog });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
