const mongoose = require('mongoose');
const {Schema} = mongoose;

const BlogSchema = new Schema({
   
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
}); 

const Blog = mongoose.model('blog',BlogSchema);
module.exports = Blog;