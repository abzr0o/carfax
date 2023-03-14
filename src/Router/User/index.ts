import { Router } from "express";
import upload from "../../util/upload";
import create from "./create";
import deleteById from "./delete";
import get from "./getall";
import getById from "./getbyId";
import update from "./update";

const User = Router();

User.post("/create", upload.single("image"), create);
User.get("/", get);
User.delete("/:id", deleteById);
User.put("/:id", upload.single("image"), update);
User.get("/:id", getById);

export default User;
