import { Router } from "express";
import validate from "../../middlewares/validate.js";
import controller from "./todo.controller.js";
import { idParamSchema, createTodoSchema, updateTodoSchema, statusSchema, listQuerySchema,  } from "./todo.validation.js";

const router = Router();

router.get("/", validate(listQuerySchema, "query"), controller.list);
router.get("/stats", controller.stats);
router.post("/", validate(createTodoSchema), controller.create);
router.get("/:id", validate(idParamSchema, "params"), controller.getById);
router.put("/:id", validate(idParamSchema, "params"), validate(updateTodoSchema), controller.update);
router.patch(
  "/:id/status",
  validate(idParamSchema, "params"),
  validate(statusSchema),
  controller.updateStatus,
);
router.delete("/:id", validate(idParamSchema, "params"), controller.remove);

export default router;
