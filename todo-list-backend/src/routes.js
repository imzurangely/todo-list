const { Router } = require("express");
const authenticate = require("./middlewares/auth");
const authRoutes = require("./modules/auth/auth.routes");
const folderRoutes = require("./modules/folders/folder.routes");
const todoRoutes = require("./modules/todos/todo.routes");
const noteRoutes = require("./modules/notes/note.routes");

const router = Router();

router.get("/health", (_req, res) => res.json({ success: true, data: { status: "ok" }, message: "API operativa" }));

router.use("/auth", authRoutes);
router.use("/folders", authenticate, folderRoutes);
router.use("/todos", authenticate, todoRoutes);
router.use("/notes", authenticate, noteRoutes);

module.exports = router;
