const express = require('express');
const Appointment = require('../models/AppointmentSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
router.get('/fetchallappointments',async (req,res)=>{
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
router.post('/bookappointment', async (req, res) => {
        try {
            const { name, email, age, mobile,gender,date, timeSlotStart, timeSlotEnd  } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newAppointment = new Appointment({
                name, email, age,mobile,gender,date, timeSlotStart, timeSlotEnd 
            })
            const savedAppointment = await newAppointment.save()

            res.json(savedAppointment)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

router.delete('/deleteappointment/:id',async (req,res)=>{
    try {
        // Find the note to be delete and delete it
        let appointment = await Appointment.findById(req.params.id);
        if (!appointment) { return res.status(404).send("Not Found") }

        
        appointment = await Appointment.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", appointment: appointment });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;