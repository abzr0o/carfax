import { NextFunction, Request, Response } from "express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../prisma/db";
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as { email: string; password: string };
  try {
    const data = await client.users.findFirst({
      where: { email },
    });
    console.log(data);
    if (data) {
      const Match = await compare(password, data.password);
      if (Match) {
        const token = jwt.sign(
          {
            email,
            username: data.username,
            isAdmin: data.isAdmin,
            id: data.id,
            isinf: data.isInfint,
            text: data.text,
            img: data.img,
          },
          "test",
          {
            expiresIn: "7d",
          }
        );
        if (data.isActive) {
          res.status(200).json({ token, id: data.id }).end();
        } else {
          res.status(204).json({ error: data.isActive }).end();
        }
      } else {
        res.status(404).json({ error: "Wrong password" }).end();
      }
    } else {
      res.status(404).json({ error: "not founded" }).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export default login;
