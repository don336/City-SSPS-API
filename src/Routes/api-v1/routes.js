import { Router } from "express";
import streetRoute from "./street/Street";
import sewerRoute from "./sewer/Sewer";
import powerRoute from "./power/Power";
import securityRoute from "./security/Security";
import authRouter from "./Oauth/oauthRoute";
import { isAuthenticated } from "../../middleware/auth";
import swaggerRouter from "../swaggerRoute";
import neighborhoodRouter from "./Neighborhood/neighborhoodRoute";

const Route = Router();

Route.use("/api/v1/street", streetRoute);
Route.use("/api/v1/sewer", sewerRoute);
Route.use("/api/v1/power", powerRoute);
Route.use("/api/v1/security", securityRoute);
Route.use("/user", authRouter);
Route.use("/api/v1/neighborhood", neighborhoodRouter);
Route.use(isAuthenticated);
Route.use("/", swaggerRouter);


export default Route;
