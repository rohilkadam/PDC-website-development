import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookAppointment.css";

const BookAppointment = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [timeSlots, setTimeSlots] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    mobile: '',
    gender: '',
    date: ''
  });
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  

  useEffect(() => {
    updateTimeSlots();
  }, [timeOfDay]);

  const updateTimeSlots = () => {
    // Clear existing time slots
    setTimeSlots([]);

    // Generate time slots based on the selected time of day
    const startTime = new Date();
    startTime.setHours(
      timeOfDay === "morning" ? 11 : timeOfDay === "afternoon" ? 12 : 16,
      0,
      0,
      0
    );
    const numberOfSlots =
      timeOfDay === "morning" ? 4 : timeOfDay === "afternoon" ? 16 : 12;
    for (let i = 0; i < numberOfSlots; i++) {
      const startTimeSlot = new Date(startTime.getTime() + i * 15 * 60 * 1000);
      const endTimeSlot = new Date(startTimeSlot.getTime() + 15 * 60 * 1000);

      const formattedStartTime = startTimeSlot.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedEndTime = endTimeSlot.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setTimeSlots((prevSlots) => [
        ...prevSlots,
        {
          start: formattedStartTime,
          end: formattedEndTime,
          selected: false,
        },
      ]);
    }
  };

  const handleTimeSlotClick = (start, end) => {
    // Check if the clicked slot is already booked
    const isSlotBooked = bookedAppointments.some(
      (appointment) =>
        appointment.timeSlotStart === start && appointment.timeSlotEnd === end
    );
  
    if (isSlotBooked) {
      alert("This slot has already been booked.");
      return;
    }
  
    // Handle time slot click
    console.log(`Selected time slot: ${start} - ${end}`);
  
    // Update the selected time slot
    const updatedTimeSlots = timeSlots.map((slot) => {
      if (slot.start === start && slot.end === end) {
        return { ...slot, selected: true };
      } else {
        return { ...slot, selected: false };
      }
    });
    setTimeSlots(updatedTimeSlots);
  
    setSelectedTimeSlot({ start, end });
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTimeSlot) {
      alert("Please select a time slot.");
      return;
    }
    
    setIsSubmitting(true); // Set isSubmitting to true when form is submitted
  
    try {
      // Add the selected time slot to the formData before making the POST request
      const dataToSend = {
        ...formData,
        timeSlotStart: selectedTimeSlot.start,
        timeSlotEnd: selectedTimeSlot.end,
      };
      // Make a POST request to your API endpoint
      const res = await axios.post(
        "https://pdc-backend-mg9n.onrender.com/api/appointment/bookappointment",
        dataToSend
      );
      
      console.log(res.data); // Log the response from the server
      setBookingSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false); // Set isSubmitting back to false after submission is complete
    }
  };
  
  const handleChange = (e) => {
    if (e.target.name === 'date') {
      const selectedDate = new Date(e.target.value);
      const currentDate = new Date();
      console.log(selectedDate);
      console.log(currentDate);
      if (selectedDate.getDay() === 0) { // 0 corresponds to Sunday
        alert('Appointments are not available on Sundays. Please select another date.');
        setFormData({ ...formData, date: '' }); // Reset the date field
        return;
      }
      if (selectedDate < currentDate) {
        alert('Please select a date from the future.');
        setFormData({ ...formData, date: '' }); // Reset the date field
        return;
      }
      
      // Format the date as YYYY-MM-DD
      const formattedDate = selectedDate.toISOString().split('T')[0];
      console.log(formattedDate);
      // Set the formatted date as the value of the date input field
      setFormData({ ...formData, date: formattedDate });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
};

  useEffect(() => {
    fetchBookedAppointments();
  }, []);
  
  const fetchBookedAppointments = async () => {
    try {
      const response = await axios.get("https://pdc-backend-mg9n.onrender.com/api/appointment/fetchallappointments");
      const bookedAppointmentsData = response.data; // Assuming the response contains the booked appointments data in an array format
      setBookedAppointments(bookedAppointmentsData);
    } catch (error) {
      console.error("Error fetching booked appointments:", error);
    }
  };

  return (
    <div className="body">
    <div className="appointment-form ">
      <div className="container">
        <h1>Book Appointment</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="w-md-50 mb-3">
            <label className="form-label" htmlFor="name">
              Name:
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="mobile">
              Mobile Number:
            </label>
            <input
              className="form-control"
              type="tel"
              id="mobile"
              name="mobile"
              pattern="[0-9]{10}"
              required
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="age">
              Age:
            </label>
            <input
              className="form-control"
              type="number"
              id="age"
              name="age"
              min="1"
              max="120"
              required
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="radio"
              id="male"
              className="form-check-input"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            <label htmlFor="male" className="form-check-label">
              Male
            </label>
            </div>
            <div className="mb-3">
            <input
              type="radio"
              id="female"
              className="form-check-input"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            <label htmlFor="female" className="form-check-label">
              Female
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="date">
              Select Date:
            </label>
            <input
              className="form-control"
              type="date"
              id="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="timeOfDay">
              Select Time of Day:
            </label>
            <select
              className="form-select"
              id="timeOfDay"
              name="timeOfDay"
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(e.target.value)}
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Time Slots:</label>
            <div className="container">
              <div className="row">
              {timeSlots.map((slot, index) => (
                    <div className="col-6" key={index}>
                      <button
                        type="button"
                        className={`time-slot btn ${
                          selectedTimeSlot &&
                          selectedTimeSlot.start === slot.start &&
                          selectedTimeSlot.end === slot.end
                            ? "btn-danger"
                            : bookedAppointments.some(
                                (appointment) =>
                                  appointment.timeSlotStart === slot.start &&
                                  appointment.timeSlotEnd === slot.end
                              )
                            ? "btn-danger"
                            : "btn-success"
                        }`}
                        onClick={() => handleTimeSlotClick(slot.start, slot.end)}
                      >
                        {`${slot.start} - ${slot.end}`}
                      </button>
                    </div>
           ))}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <button
              className="btn btn-danger submit-btn"
              id="submit-appointment"
              type="submit"
              disabled={isSubmitting} 
            >
              Get an appointment
            </button>
          </div>
          {bookingSuccess && ( // Show notification if booking success is true
            <div className="alert alert-success" role="alert">
              Appointment has been booked successfully!
            </div>
          )}
        </form>
      </div>
    </div>
    </div>
  );
};

export default BookAppointment;
