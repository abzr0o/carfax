import { NextFunction, Request, Response } from "express";
import client from "../../prisma/db";
import bcrypt from "bcrypt";
import { uploadfileToS3 } from "../../util/upload";
import randomString from "../../util/randomName";
const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const body = req.body as {
      username?: string;
      email?: string;
      points?: number;
      isAdmin?: boolean;
      isInfint?: boolean;
      text?: string;
      password?: string;
      isActive?: boolean;
    };

    if (req.file) {
      const file = req.file;
      const name = randomString(16);
      uploadfileToS3(file, name).then((a) => console.log(a));

      const data = await client.users.update({
        data: {
          ...body,
          points: Number(body.points),
          isAdmin: Boolean(body.isAdmin),
          isInfint: Boolean(body.isInfint),
          isActive: Boolean(body.isActive),
          password: body.password
            ? await bcrypt.hash(body.password, 10)
            : undefined,
          img: name + "." + file.mimetype.split("/")[1],
        },
        where: { id },
      });
      res.status(200).json(data).end();
    } else {
      const data = await client.users.update({
        data: {
          ...body,
          points: Number(body.points),
          isAdmin: Boolean(body.isAdmin),
          isInfint: Boolean(body.isInfint),
          isActive: Boolean(body.isActive),
          password: body.password
            ? await bcrypt.hash(body.password, 10)
            : undefined,
        },
        where: { id },
      });
      res.status(200).json(data).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export default update;
