const { Router } = require("express");
const validate = require("../../middlewares/validate");
const controller = require("./note.controller");
const { idParamSchema, noteSchema } = require("./note.validation");

const router = Router();

router.get("/", controller.list);
router.post("/", validate(noteSchema), controller.create);
router.get("/:id", validate(idParamSchema, "params"), controller.getById);
router.put("/:id", validate(idParamSchema, "params"), validate(noteSchema), controller.update);
router.delete("/:id", validate(idParamSchema, "params"), controller.remove);

module.exports = router;
