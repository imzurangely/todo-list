import { Router } from "express";
import authenticate from "./middlewares/auth.js";
import authRoutes from "./modules/auth/auth.routes.js";
import folderRoutes from "./modules/folders/folder.routes.js";
import todoRoutes from "./modules/todos/todo.routes.js";
import noteRoutes from "./modules/notes/note.routes.js";

const router = Router();

router.get("/health", (_req, res) => res.json({ success: true, data: { status: "ok" }, message: "API operativa" }));

router.use("/auth", authRoutes);
router.use("/folders", authenticate, folderRoutes);
router.use("/todos", authenticate, todoRoutes);
router.use("/notes", authenticate, noteRoutes);

export default router;
