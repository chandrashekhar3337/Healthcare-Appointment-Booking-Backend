import mongoose from "mongoose";

import Appointment from "./appointment.model.js";
import DoctorSlot from "../doctor/doctorSlot.model.js";
import redisClient from "../../config/redis.js";

import ApiError from "../../utils/ApiError.js";

// GET PATIENT APPOINTMENTS
export const getMyAppointmentsService =
  async (userId) => {

    const appointments =
      await Appointment.find({
        patient: userId,
      })
        .populate(
          "doctor",
          "name email"
        )
        .populate(
          "slot",
          "startTime endTime"
        )
        .sort({
          createdAt: -1,
        });

    return appointments;
  };
// BOOK APPOINTMENT
export const bookAppointmentService = async (
  patientId,
  payload
) => {

  const { slotId } = payload;

  const session =
    await mongoose.startSession();

  try {

    session.startTransaction();

    // ATOMIC SLOT LOCK
    const slot =
      await DoctorSlot.findOneAndUpdate(
        {
          _id: slotId,
          isBooked: false,
        },

        {
          $set: {
            isBooked: true,
          },
        },

        {
          new: true,
          session,
        }
      );
    // CHECK PATIENT OVERLAPPING APPOINTMENTS
const existingAppointment =
  await Appointment.findOne({
    patient: patientId,

    status: "booked",

    startTime: {
      $lt: slot.endTime,
    },

    endTime: {
      $gt: slot.startTime,
    },
  });

if (existingAppointment) {
  throw new ApiError(
    400,
    "You already have another appointment at this time"
  );
}
    // SLOT NOT FOUND / ALREADY BOOKED
    if (!slot) {
      throw new ApiError(
        400,
        "Slot already booked"
      );
    }

    // CREATE APPOINTMENT
    const appointment =
      await Appointment.create(
        [
          {
            patient: patientId,
            doctor: slot.doctor,
            slot: slot._id,
            startTime: slot.startTime,
            endTime: slot.endTime,
          },
        ],
        {
          session,
        }
      );

    // COMMIT TRANSACTION
    await session.commitTransaction();

    return appointment[0];

  } catch (error) {

    // ROLLBACK
    await session.abortTransaction();

    throw error;

  } finally {

    session.endSession();
  }
};;



// CANCEL APPOINTMENT
export const cancelAppointmentService =
  async (appointmentId, userId) => {

    const session =
      await mongoose.startSession();

    session.startTransaction();

    try {
      const appointment =
        await Appointment.findById(
          appointmentId
        ).session(session);

      if (!appointment) {
        throw new ApiError(
          404,
          "Appointment not found"
        );
      }

      // OWNERSHIP CHECK
      if (
        appointment.patient.toString() !==
        userId.toString()
      ) {
        throw new ApiError(
          403,
          "Unauthorized cancellation"
        );
      }

      // ALREADY CANCELLED
      if (
        appointment.status === "cancelled"
      ) {
        throw new ApiError(
          400,
          "Appointment already cancelled"
        );
      }

      // UPDATE STATUS
      appointment.status = "cancelled";

      await appointment.save({ session });

      // FREE SLOT AGAIN
      await DoctorSlot.findByIdAndUpdate(
        appointment.slot,
        {
          isBooked: false,
        },
        {
          session,
        }
      );
      await redisClient.del(
      "available_doctors"
       );
      await session.commitTransaction();

      session.endSession();

    } catch (error) {
      await session.abortTransaction();

      session.endSession();

      throw error;
    }
  };
  export const getSingleAppointmentService =
  async (
    appointmentId,
    user
  ) => {

    const appointment =
      await Appointment.findById(
        appointmentId
      )
      .populate(
        "patient",
        "name email"
      )
      .populate(
        "doctor",
        "name email"
      )
      .populate(
        "slot"
      );

    // NOT FOUND
    if (!appointment) {

      throw new ApiError(
        404,
        "Appointment not found"
      );
    }

    // AUTHORIZATION CHECK
    const isPatient =
      appointment.patient._id.toString()
      === user._id.toString();

    const isDoctor =
      appointment.doctor._id.toString()
      === user._id.toString();

    if (
      !isPatient &&
      !isDoctor
    ) {
      throw new ApiError(
        403,
        "Unauthorized access"
      );
    }

    return appointment;
  };