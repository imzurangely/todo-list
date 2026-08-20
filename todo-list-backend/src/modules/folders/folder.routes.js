import { Router } from "express";
import validate from "../../middlewares/validate.js";
import controller from "./folder.controller.js";
import { idParamSchema, createFolderSchema, updateFolderSchema,  } from "./folder.validation.js";

const router = Router();

router.get("/", controller.list);
router.post("/", validate(createFolderSchema), controller.create);
router.get("/:id", validate(idParamSchema, "params"), controller.getById);
router.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateFolderSchema),
  controller.update,
);
router.delete("/:id", validate(idParamSchema, "params"), controller.remove);

export default router;
