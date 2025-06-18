import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAvailableSlots,
  cancelAppointment
} from '../controllers/appointments.controllers.js';

const router = express.Router();

// Book a new appointment
router.post('/book', createAppointment);

// Get all appointments
router.get('/', getAppointments);

// Get available slots for a given day
router.get('/calendar', getAvailableSlots);

// Cancel an appointment
router.put('/cancel/:id', cancelAppointment);

export default router;
