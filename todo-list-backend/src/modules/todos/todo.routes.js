const { Router } = require("express");
const validate = require("../../middlewares/validate");
const controller = require("./todo.controller");
const {
  idParamSchema,
  createTodoSchema,
  updateTodoSchema,
  statusSchema,
  listQuerySchema,
} = require("./todo.validation");

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

module.exports = router;
