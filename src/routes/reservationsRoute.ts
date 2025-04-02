import { Router } from "express";
import { MyMiddleware } from "../middlewares/MyMiddleware";
import { ReservationsController } from "../controllers/ReservationsControllers";

const reservationsController = new ReservationsController();

export const reservationsRoute = Router();

reservationsRoute.get("/", reservationsController.index);

reservationsRoute.post("/", MyMiddleware, reservationsController.create);

reservationsRoute.delete("/", reservationsController.remove);

reservationsRoute.put("/:id", reservationsController.update);
