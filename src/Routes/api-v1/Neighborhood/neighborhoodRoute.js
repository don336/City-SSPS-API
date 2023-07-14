import { Router } from "express";
import NeighborhoodController from "../../../controller/NeighborhoodController";
const neighborhoodRouter = Router();

neighborhoodRouter.get(
  "/:neighborhoodInput",
  NeighborhoodController.getAllNeighborhoods
);

export default neighborhoodRouter;
