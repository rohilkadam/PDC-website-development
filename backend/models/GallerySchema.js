const mongoose = require('mongoose');
const {Schema} = mongoose;

const GallerySchema = new Schema({
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },

});

const Gallery = mongoose.model('Gallery',GallerySchema);
module.exports = Gallery;