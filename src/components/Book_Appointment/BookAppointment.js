import React, { useState, useEffect } from "react";
import "./BookAppointment.css";

const BookAppointment = () => {
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [timeSlots, setTimeSlots] = useState([]);

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
        },
      ]);
    }
  };

  const handleTimeSlotClick = (start, end) => {
    // Handle time slot click
    console.log(`Selected time slot: ${start} - ${end}`);
  };

  return (
    <div className="body">
    <div className="appointment-form ">
      <div className="container shadow">
        <h1>Book Appointment</h1>
        <form>
          <div className="w-md-50 mb-3">
            <label className="form-label" htmlFor="name">
              Name:
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              name="user_name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              className="form-control"
              type="email"
              id="mail"
              name="user_email"
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
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="gender">
              Gender:
            </label>
            <div className="mb-3">
              <input
                type="radio"
                id="gender"
                className="form-check-input"
                name="gender"
              />
              <label htmlFor="male" className="form-check-label">
                Male
              </label>
            </div>
            <div className="mb-3">
              <input
                type="radio"
                id="gender"
                className="form-check-input"
                name="gender"
              />
              <label htmlFor="female" className="form-check-label">
                Female
              </label>
            </div>
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
                  <div className="col-6">
                    <button
                      key={index}
                      className="time-slot btn btn-success"
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
            >
              Get an appointment
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default BookAppointment;
