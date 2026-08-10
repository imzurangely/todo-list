const { Router } = require("express");
const validate = require("../../middlewares/validate");
const authenticate = require("../../middlewares/auth");
const controller = require("./auth.controller");
const { registerSchema, loginSchema } = require("./auth.validation");

const router = Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);
router.get("/me", authenticate, controller.me);

module.exports = router;
