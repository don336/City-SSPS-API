import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "../../swagger-output.json";
const swaggerRouter = Router();
swaggerRouter.use("/api-docs", serve);
swaggerRouter.get("/api-docs", setup(swaggerDocument));

export default swaggerRouter;
