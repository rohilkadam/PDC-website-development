const mongoose = require('mongoose')
const { Schema } = mongoose;

const TestimonialSchema = new Schema({
    name:  {
      type : String,
      required :true
    },
    image: {
      type : String,
      required :true
    },
    feedback: {
        type : String,
        required :true
      },
  
  });
  
  const Testimonial = mongoose.model('testimonial',TestimonialSchema)
  module.exports = Testimonial