const mongoose = require('mongoose');
const {Schema} = mongoose;

const AppointmentSchema = new Schema({
   
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    timeSlotStart: {
        type: String,
        required: true
    },
    timeSlotEnd: {
        type: String,
        required: true
    }
}); 

const Appointment = mongoose.model('appointment',AppointmentSchema);
module.exports = Appointment;