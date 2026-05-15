import cron from "node-cron";

import Appointment from
  "../modules/appointment/appointment.model.js";

// EVERY MINUTE
cron.schedule("* * * * *", async () => {

  console.log(
    "Running appointment status job..."
  );

  await Appointment.updateMany(
    {
      endTime: {
        $lt: new Date(),
      },

      status: "booked",
    },

    {
      $set: {
        status: "completed",
      },
    }
  );
});