import { Router } from "express";
import validate from "../../middlewares/validate.js";
import authenticate from "../../middlewares/auth.js";
import controller from "./auth.controller.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);
router.get("/me", authenticate, controller.me);

export default router;
