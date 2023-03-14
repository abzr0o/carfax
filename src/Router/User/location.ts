import { Request, Response } from "express";
import client from "../../prisma/db";

const location = async (req: Request, res: Response) => {
  const ip = req.headers["x-real-ip"] as string;
  const id = req.body.id;
  const loca = await client.location.create({
    data: {
      ip,
      user: {
        connect: {
          id,
        },
      },
    },
  });
  res.status(204).end();
};

export default location;
