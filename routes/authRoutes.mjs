import express from "express";
import AuthService from "../services/authService.mjs";

const router = express.Router();
const authService = new AuthService();

router.post("/login", (req, res) => {
  const { userId } = req.body;
  const token = authService.login(userId);
  res.json({ token });
});

export default router;
