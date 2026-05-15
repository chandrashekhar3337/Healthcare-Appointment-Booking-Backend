import mongoose from "mongoose";

const doctorSlotSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


// INDEX FOR PERFORMANCE
doctorSlotSchema.index({
  doctor: 1,
  startTime: 1,
  endTime: 1,
});

const DoctorSlot = mongoose.model(
  "DoctorSlot",
  doctorSlotSchema
);

export default DoctorSlot;