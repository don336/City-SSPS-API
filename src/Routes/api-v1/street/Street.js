import { Router } from "express";
import StreetController from "../../../controller/StreetController";
const streetRouter = Router();

streetRouter.get("/", StreetController.getStreets);
streetRouter.get("/:id", StreetController.getStreet);
streetRouter.post("/", StreetController);
streetRouter.put("/:id", StreetController);
streetRouter.delete("/:id", StreetController);

export default streetRouter;
