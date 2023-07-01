import { Router } from "express";
import streetRoute from "./street/Street";
import sewerRoute from "./sewer/Sewer";
import authRouter from "./oauthRoute";

const Route = Router();

Route.use("/api/v1/street", streetRoute);
Route.use("/api/v1/sewer", sewerRoute);
Route.use("/user", authRouter);

export default Route;
