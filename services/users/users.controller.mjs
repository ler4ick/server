import { Router } from "express";
const router = Router();
import {
  authenticate as _authenticate,
  getAll as _getAll,
} from "./user.service.mjs";

// routes
router.post("/authenticate", authenticate);
router.get("/", getAll);

function authenticate(req, res, next) {
  _authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function getAll(req, res, next) {
  _getAll()
    .then((users) => res.json(users))
    .catch(next);
}

export default router;
