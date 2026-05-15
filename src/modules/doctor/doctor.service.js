import DoctorSlot from "./doctorSlot.model.js";
import User from "../user/user.model.js";
import ApiError from "../../utils/ApiError.js";
import Appointment from "../appointment/appointment.model.js";
import redisClient from "../../config/redis.js";
// GET DOCTOR APPOINTMENTS
export const getDoctorAppointmentsService =
  async (doctorId) => {

    const appointments =
      await Appointment.find({
        doctor: doctorId,
      })
        .populate(
          "patient",
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
// GET ALL DOCTORS
export const getAllDoctorsService = async () => {
  const doctors = await User.find({
    role: "doctor",
  }).select(
    "_id name email createdAt startTime endTime"
  );

  return doctors;
};
// CREATE SLOT
export const createSlotService = async (
  userId,
  payload
) => {
  const { startTime, endTime } = payload;

  const start = new Date(startTime);
  const end = new Date(endTime);

  // PAST SLOT CHECK
  if (start < new Date()) {
    throw new ApiError(
      400,
      "Cannot create past slot"
    );
  }

  // INVALID TIME CHECK
  if (start >= end) {
    throw new ApiError(
      400,
      "End time must be after start time"
    );
  }

  // OVERLAPPING SLOT CHECK
  const existingSlot = await DoctorSlot.findOne({
    doctor: userId,

    $or: [
      {
        startTime: {
          $lt: end,
        },

        endTime: {
          $gt: start,
        },
      },
    ],
  });

  if (existingSlot) {
    throw new ApiError(
      400,
      "Overlapping slot already exists"
    );
  }

  const slot = await DoctorSlot.create({
    doctor: userId,
    startTime: start,
    endTime: end,
  });
  
await redisClient.del(
  "available_doctors"
);
  return slot;
};



// GET DOCTOR SLOTS
export const getDoctorSlotsService = async (
  doctorId
) => {

  const slots = await DoctorSlot
    .find({
      doctor: doctorId,
      endTime: {
        $gte: new Date(),
      },
    })
    .sort({
      startTime: 1,
    });

  return slots;
};
// GET DOCTORS WITH AVAILABLE SLOTS
export const getDoctorsWithAvailableSlotsService =
  async () => {
    // CHECK CACHE
    const cachedDoctors =
      await redisClient.get(
        "available_doctors"
      );

    // CACHE HIT
    if (cachedDoctors) {

      console.log(
        "Serving from Redis cache"
      );

      return JSON.parse(
        cachedDoctors
      );
    }
    const doctors = await User.aggregate([
      {
        $match: {
          role: "doctor",
        },
      },

      {
        $lookup: {
          from: "doctorslots",

          let: {
            doctorId: "$_id",
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: [
                        "$doctor",
                        "$$doctorId",
                      ],
                    },

                    {
                      $eq: [
                        "$isBooked",
                        false,
                      ],
                    },

                    {
                      $gte: [
                        "$endTime",
                        new Date(),
                      ],
                    },
                  ],
                },
              },
            },

            {
              $project: {
                doctor: 0,
                __v: 0,
              },
            },

            {
              $sort: {
                startTime: 1,
              },
            },
          ],

          as: "availableSlots",
        },
      },

      // REMOVE DOCTORS WITH NO SLOTS
      {
        $match: {
          "availableSlots.0": {
            $exists: true,
          },
        },
      },

      {
        $project: {
          password: 0,
          refreshToken: 0,
          __v: 0,
        },
      },
    ]);

    // SAVE CACHE
    await redisClient.set(
      "available_doctors",
      JSON.stringify(doctors),
      {
        EX: 60,
      }
    );

    return doctors;
  };
  // DELETE SLOT
export const deleteSlotService = async (
  slotId,
  doctorId
) => {

  const slot =
    await DoctorSlot.findById(slotId);

  // SLOT NOT FOUND
  if (!slot) {
    throw new ApiError(
      404,
      "Slot not found"
    );
  }

  // OWNERSHIP CHECK
  if (
    slot.doctor.toString() !==
    doctorId.toString()
  ) {
    throw new ApiError(
      403,
      "Unauthorized action"
    );
  }

  // BOOKED SLOT CHECK
  if (slot.isBooked) {
    throw new ApiError(
      400,
      "Cannot delete booked slot"
    );
  }

  await slot.deleteOne();
};
export const getDoctorAvailableSlotsService =
  async (doctorId) => {

    const slots =
      await DoctorSlot.find({

        doctor: doctorId,

        isBooked: false,

        endTime: {
          $gte: new Date(),
        },
      })
      .sort({
        startTime: 1,
      });

    return slots;
  };
  export const updateSlotService =
  async (
    slotId,
    doctorId,
    payload
  ) => {

    const {
      startTime,
      endTime,
    } = payload;

    const slot =
      await DoctorSlot.findById(slotId);

    // SLOT NOT FOUND
    if (!slot) {
      throw new ApiError(
        404,
        "Slot not found"
      );
    }

    // OWNERSHIP CHECK
    if (
      slot.doctor.toString() !==
      doctorId.toString()
    ) {
      throw new ApiError(
        403,
        "Unauthorized action"
      );
    }

    // BOOKED SLOT CHECK
    if (slot.isBooked) {
      throw new ApiError(
        400,
        "Cannot update booked slot"
      );
    }

    // EXPIRED SLOT CHECK
    if (
      slot.endTime < new Date()
    ) {
      throw new ApiError(
        400,
        "Expired slot cannot be updated"
      );
    }

    // INVALID TIME CHECK
    if (
      new Date(startTime) >=
      new Date(endTime)
    ) {
      throw new ApiError(
        400,
        "Invalid slot timing"
      );
    }

    // OVERLAPPING CHECK
    const overlappingSlot =
      await DoctorSlot.findOne({

        _id: {
          $ne: slotId,
        },

        doctor: doctorId,

        startTime: {
          $lt: endTime,
        },

        endTime: {
          $gt: startTime,
        },
      });

    if (overlappingSlot) {

      throw new ApiError(
        400,
        "Overlapping slot exists"
      );
    }

    // UPDATE SLOT
    slot.startTime = startTime;
    slot.endTime = endTime;

    await slot.save();

    return slot;
  };