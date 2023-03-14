import { Router } from "express";
import remove from "../../middleware/removepoint";
import addhist from "./add";
import getHistory from "./get";

const history = Router();

history.get("/", getHistory);
history.post("/add", addhist);
export default history;
