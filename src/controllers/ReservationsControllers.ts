import { Request, response, Response } from "express";
import { z } from "zod";
import { Database } from "../database/database";

const database = new Database();

class ReservationsController {
  index(request: Request, response: Response) {
    const reservation = database.select("reservations");

    response.json(reservation);
  }

  create(request: Request, response: Response) {
    const bodySchema = z.object({
      service: z.string({ required_error: "Service is required" }),
      date: z.string({ required_error: "Data is required" }),
      time: z.string({ required_error: "Time is required" }),
      customer_name: z.string({ required_error: "Customer_name is required" }),
    });

    const { service, time, date, customer_name } = bodySchema.parse(
      request.body
    );

    database.insert("reservations", {
      user_id: request.user_id,
      ...request.body,
    });

    response.status(201).end("Criado!");
  }

  remove(request: Request, response: Response) {
    database.delete("reservations", "33e36a5e-8c3c-4dfc-b047-a512728e1f7b");

    response.end("Item removido");
  }

  update(request: Request, response: Response) {
    const { id } = request.params; // Pegando ID da URL
    const updates = request.body; // Novos dados a serem atualizados

    database.update("reservations", id, updates);

    response.json({ message: "Atualizado com sucesso!" });
  }
}

export { ReservationsController };
