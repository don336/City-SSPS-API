import { Router } from "express";
import StreetController from "../../../controller/StreetController";
const streetRouter = Router();

streetRouter.get("/", StreetController.getStreets);
streetRouter.get("/:id", StreetController.getStreet);
streetRouter.post("/", StreetController.postProblem);
streetRouter.put("/:id", StreetController.updateProblem);
streetRouter.delete("/:id", StreetController.deleteProblem);

export default streetRouter;
