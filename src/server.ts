import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";
import { ZodError } from "zod";

const PORT = 3333;

const app = express();
app.use(express.json());

app.use(routes);

app.use(
  (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
      response
        .status(400)
        .json({ message: "Validation Error", issue: error.format() });
      return;
    }

    response.status(500).json({ message: error.message });
  }
);

app.listen(3333, () => {
  console.log("Server is running on port: " + PORT);
});
