import { Router } from "express";
import StreetController from "../../../controller/StreetController";
const streetRouter = Router();

streetRouter.get("/:userId/", StreetController.getStreets);
streetRouter.get("/:userId/:id", StreetController);
streetRouter.post("/:userId/", StreetController);
streetRouter.put("/:userId/:id", StreetController);
streetRouter.delete("/:userId/:id", StreetController);

export default streetRouter;
