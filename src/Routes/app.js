import express from "express";
import cors from "cors";
import connect from "../db/mongoos";
import Route from "./api-v1/routes";
import swaggerRouter from "./swaggerRoute";
import passportApp from 'passport';
import sessionApp from 'express-session';
import isAuthenticated from "../middleware/auth";

connect();
const app = express();

app.use(sessionApp({
  secret: 'thissession',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false}
}));

require('../auth/auth.js');


app.use(cors());
app.use(express.json());

app.use(passportApp.initialize());
app.use(passportApp.session());

//app.use("/", swaggerRouter);
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

//app.use('/user', isAuthenticated);

app.use(Route);

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
