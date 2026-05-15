import dotenv from "dotenv";
dotenv.config();

import { createClient } from "redis";

const redisClient = createClient({
  username: process.env.REDIS_USERNAME,

  password: process.env.REDIS_PASSWORD,

  socket: {
    host: process.env.REDIS_HOST,

    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on("connect", () => {
  console.log("Redis Connected");
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err.message);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log(
      "Redis Connection Failed:",
      error.message
    );
  }
};

export default redisClient;

export { connectRedis };