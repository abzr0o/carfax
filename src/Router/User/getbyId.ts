import { NextFunction, Request, Response } from "express";
import client from "../../prisma/db";

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await client.users.findUnique({
      where: { id },
      select: {
        email: true,
        id: true,
        isAdmin: true,
        isInfint: true,
        points: true,
        username: true,
      },
    });
    if (data) {
      res.status(200).json(data).end();
    } else {
      res.status(404).json({ error: "not found" }).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export default getById;
