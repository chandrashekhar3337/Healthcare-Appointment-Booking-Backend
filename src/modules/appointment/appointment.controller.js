import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  bookAppointmentService,
  cancelAppointmentService,getMyAppointmentsService,getSingleAppointmentService
} from "./appointment.service.js";

// GET MY APPOINTMENTS
export const getMyAppointments =
  asyncHandler(async (req, res) => {

    const appointments =
      await getMyAppointmentsService(
        req.user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        appointments,
        "Appointments fetched successfully"
      )
    );
  });
// BOOK
export const bookAppointment =
  asyncHandler(async (req, res) => {

    const appointment =
      await bookAppointmentService(
        req.user._id,
        req.body
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        appointment,
        "Appointment booked successfully"
      )
    );
  });



// CANCEL
export const cancelAppointment =
  asyncHandler(async (req, res) => {

    await cancelAppointmentService(
      req.params.id,
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {},
        "Appointment cancelled successfully"
      )
    );
  });
  export const getSingleAppointment =
  async (
    req,
    res,
    next
  ) => {

    try {

      const appointment =
        await getSingleAppointmentService(

          req.params.appointmentId,

          req.user
        );

      return res.status(201).json(
      new ApiResponse(
        201,
        appointment,
        "Appointment booked successfully"
      )
    );
    } catch (error) {
      next(error);
    }
  };