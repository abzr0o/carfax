import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import client from "../../prisma/db";
import { unlink, uploadfileToS3 } from "../../util/upload";
import randomString from "../../util/randomName";
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as {
      username: string;
      password: string;
      email: string;
      isAdmin: boolean;
      points?: number;
      isInfint?: boolean;
      text: string;
      isActive: boolean;
    };
    const data = await client.users.findFirst({
      where: {
        email: body.email,
      },
    });
    if (data) {
      res.status(400).json({ error: "email is used" });
      next();
    } else {
      const hashed = await bcrypt.hash(body.password, 10);
      if (req.file) {
        const name = randomString(16);
        const file = req.file;
        console.log(file);
        uploadfileToS3(file, name).then((a) => console.log(a));
        await client.users.create({
          data: {
            ...body,
            password: hashed,
            points: Number(body.points),
            img: name + "." + file.mimetype.split("/")[1],
            isAdmin: Boolean(body.isAdmin),
            isInfint: Boolean(body.isInfint),
            isActive: Boolean(body.isActive),
          },
        });
      } else {
        await client.users.create({
          data: { ...body, password: hashed, points: Number(body.points) },
        });
      }
      res.status(201).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export default create;
