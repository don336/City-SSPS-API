import { Router } from "express";
import SecurityController from "../../../controller/StreetController";
const securityRouter = Router();

securityRouter.get("/:userId/", SecurityController.getStreets);
securityRouter.get("/:userId/:id", SecurityController);
securityRouter.post("/:userId/", SecurityController);
securityRouter.put("/:userId/:id", SecurityController);
securityRouter.delete("/:userId/:id", SecurityController
);

export default streetRouter;
