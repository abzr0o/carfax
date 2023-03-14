import { Request, Response } from "express";
import client from "../../prisma/db";

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await client.users.delete({
      where: { id },
    });
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};

export default deleteById;
