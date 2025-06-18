import Appointment from '../models/appointments.js';
import dayjs from 'dayjs';

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { doctorName, date, time } = req.body;

    const existing = await Appointment.findOne({ doctorName, date, time });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Slot already booked',
      });
    }

    const appointment = new Appointment(req.body);
    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error booking appointment',
      error: err.message,
    });
  }
};

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.json({
      success: true,
      message: 'Appointments fetched successfully',
      data: appointments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: err.message,
    });
  }
};

// Get available slots (calendar)
export const getAvailableSlots = async (req, res) => {
  try {
    const { date, specialization, location } = req.query;
    const allSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

    const booked = await Appointment.find({ date, specialization, location });
    const bookedTimes = booked.map(appt => appt.time);
    const available = allSlots.filter(time => !bookedTimes.includes(time));

    res.json({
      success: true,
      message: 'Available slots fetched successfully',
      data: {
        specialization,
        location,
        date,
        availableSlots: available,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching available slots',
      error: err.message,
    });
  }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appt = await Appointment.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!appt) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appt,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling appointment',
      error: err.message,
    });
  }
};
