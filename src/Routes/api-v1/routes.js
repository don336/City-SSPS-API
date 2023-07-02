import { Router } from "express";
import streetRoute from "./street/Street";
import sewerRoute from "./sewer/Sewer";
import powerRoute from "./power/Power";
import authRouter from "./oauthRoute";
import { isAuthenticated } from "../../middleware/auth";
import swaggerRouter from "../swaggerRoute";

const Route = Router();

Route.use("/api/v1/street", streetRoute);
Route.use("/api/v1/sewer", sewerRoute);
Route.use("/api/v1/power", powerRoute);
Route.use("/user", authRouter);
Route.use(isAuthenticated);
Route.use("/", swaggerRouter);



export default Route;
