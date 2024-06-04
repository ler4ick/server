import { Router } from "express";
const router = Router();
import { getRoomsById as _getRoomsById } from "./room.service.mjs";

// routes

router.get("/", getRoomsById);

function getRoomsById(req, res, next) {
  console.log(req);
  _getRoomsById(req.query)
    .then((chats) => res.json(chats))
    .catch(next);
}

export default router;
