import { Request, Response } from "express";
import remove from "../../middleware/removepoint";
import client from "../../prisma/db";

const addhist = async (req: Request, res: Response) => {
  try {
    const { id, vin } = req.query as { id: string; vin: string };
    console.log(id);
    console.log(vin);
    await client.history.create({
      data: {
        vin: vin.toUpperCase(),
        userId: id,
      },
    });
    console.log("done");
    res.status(201).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export default addhist;
