import { NextFunction, Request, Response } from "express";
import client from "../prisma/db";

const remove = async (id: string) => {
  try {
    const user = await client.users.findFirst({
      where: { id },
    });

    if (!user?.isInfint && user?.points && user.points > 0) {
      await client.users.update({
        where: {
          id,
        },
        data: {
          points: { decrement: 1 },
        },
      });
      return true;
    } else if (user?.isInfint) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

export default remove;
