const { Router } = require("express");
const validate = require("../../middlewares/validate");
const controller = require("./folder.controller");
const {
  idParamSchema,
  createFolderSchema,
  updateFolderSchema,
} = require("./folder.validation");

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

module.exports = router;
