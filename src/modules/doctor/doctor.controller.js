import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {
  createSlotService,
  getDoctorSlotsService,
  getAllDoctorsService,
  getDoctorAppointmentsService,
  getDoctorsWithAvailableSlotsService,
  getDoctorAvailableSlotsService,
  deleteSlotService,
  updateSlotService,
} from "./doctor.service.js";
// GET DOCTORS WITH AVAILABLE SLOTS
export const getDoctorsWithAvailableSlots =
  asyncHandler(async (req, res) => {

    const doctors =
      await getDoctorsWithAvailableSlotsService();

    return res.status(200).json(
      new ApiResponse(
        200,
        doctors,
        "Doctors with available slots fetched successfully"
      )
    );
  });
// GET DOCTOR APPOINTMENTS
export const getDoctorAppointments =
  asyncHandler(async (req, res) => {

    const appointments =
      await getDoctorAppointmentsService(
        req.user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        appointments,
        "Doctor appointments fetched successfully"
      )
    );
  });
// CREATE SLOT
export const createSlot = asyncHandler(
  async (req, res) => {
    const slot = await createSlotService(
      req.user._id,
      req.body
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        slot,
        "Slot created successfully"
      )
    );
  }
);
export const updateSlot =
  async (
    req,
    res,
    next
  ) => {

    try {

      const slot =
        await updateSlotService(

          req.params.slotId,

          req.user._id,

          req.body
        );

      return ApiResponse(res, {

        statusCode: 200,

        success: true,

        message:
          "Slot updated successfully",

        data: slot,
      });

    } catch (error) {
      next(error);
    }
  };

// GET SLOTS
export const getDoctorSlots = asyncHandler(
  async (req, res) => {
    const slots = await getDoctorSlotsService(
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        slots,
        "Doctor slots fetched successfully"
      )
    );
  }
);
// GET ALL DOCTORS
export const getAllDoctors =
  asyncHandler(async (req, res) => {

    const doctors =
      await getAllDoctorsService();

    return res.status(200).json(
      new ApiResponse(
        200,
        doctors,
        "Doctors fetched successfully"
      )
    );
  });
  // DELETE SLOT
export const deleteSlot =
  asyncHandler(async (req, res) => {

    await deleteSlotService(
      req.params.id,
      req.user._id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {},
        "Slot deleted successfully"
      )
    );
  });
  export const getDoctorAvailableSlots =
  async (
    req,
    res,
    next
  ) => {

    try {

      const { doctorId } = req.params;

      const slots =
        await getDoctorAvailableSlotsService(
          doctorId
        );

      return ApiResponse(res, {
        statusCode: 200,
        success: true,
        message:
          "Doctor available slots fetched successfully",
        data: slots,
      });

    } catch (error) {
      next(error);
    }
  };