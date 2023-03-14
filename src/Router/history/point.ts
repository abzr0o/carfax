import { Request, Response } from "express";
import client from "../../prisma/db";

const getpoints = async (req: Request, res: Response) => {
  try {
    const { id } = req.query as { id: string };
    const data = await client.users.findUnique({ where: { id } });
    res
      .status(200)
      .json({ points: data?.isInfint ? 999 : data?.points })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export default getpoints;
