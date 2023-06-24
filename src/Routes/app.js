import express from "express";
import cors from "cors";
import connect from "../db/mongoos";
import Route from "./api-v1/routes";
import swaggerRouter from "./swaggerRoute";
connect();
const app = express();
app.use(cors());
app.use(express.json());
app.use(Route);
app.use("/", swaggerRouter);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, HEAD, OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

export default app;
