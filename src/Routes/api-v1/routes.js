import { Router } from "express";
import streetRoute from "./street/Street";
const Route = Router();

Route.use("/api/v1/street", streetRoute);

export default Route;
