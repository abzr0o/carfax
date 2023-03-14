import { NextFunction, Request, Response } from "express";
import client from "../../prisma/db";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await client.users.findMany({
      select: {
        id: true,
        email: true,
        points: true,
        username: true,
        isAdmin: true,
        isInfint: true,
        img: true,
        text: true,
        isActive: true,
        location: true,
      },
    });

    res.status(200).json(data).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export default get;
