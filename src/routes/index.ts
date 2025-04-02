import { Router } from "express";
import { reservationsRoute } from "./reservationsRoute";

export const routes = Router();

routes.use("/reservation", reservationsRoute);
