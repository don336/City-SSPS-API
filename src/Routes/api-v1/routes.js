import { Router } from "express";
import streetRoute from "./street/Street";
import sewerRoute from "./sewer/Sewer";

const Route = Router();

Route.use("/api/v1/street", streetRoute);
Route.use("/api/v1/sewer", sewerRoute);

export default Route;
