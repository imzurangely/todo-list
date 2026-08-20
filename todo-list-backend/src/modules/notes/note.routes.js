import { Router } from "express";
import validate from "../../middlewares/validate.js";
import controller from "./note.controller.js";
import { idParamSchema, noteSchema } from "./note.validation.js";

const router = Router();

router.get("/", controller.list);
router.post("/", validate(noteSchema), controller.create);
router.get("/:id", validate(idParamSchema, "params"), controller.getById);
router.put("/:id", validate(idParamSchema, "params"), validate(noteSchema), controller.update);
router.delete("/:id", validate(idParamSchema, "params"), controller.remove);

export default router;
