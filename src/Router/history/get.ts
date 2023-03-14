import { Request, Response } from "express";
import client from "../../prisma/db";

const getHistory = async (req: Request, res: Response) => {
  try {
    const { id, q } = req.query as { id: string; q?: string };
    const data = await client.history.findMany({
      where: {
        AND: [
          { userId: { equals: id } },
          { vin: q ? { contains: q.toUpperCase() } : undefined },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({ data }).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export default getHistory;
