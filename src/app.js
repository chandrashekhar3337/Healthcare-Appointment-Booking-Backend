import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";

import errorMiddleware from "./middlewares/error.middleware.js";
import routes from "./routes/index.js";
import {
  apiLimiter,
} from "./middlewares/rateLimit.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Healthcare API Running",
  });
});
app.use(apiLimiter);
app.use(errorMiddleware);
app.use("/api/v1", routes);

export default app;