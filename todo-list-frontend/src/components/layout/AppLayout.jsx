import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import FolderFormModal from "@/features/folders/components/FolderFormModal.jsx";
import TodoFormModal from "@/features/todos/components/TodoFormModal.jsx";
import useData from "@/hooks/useData.js";

/** Estructura general: sidebar responsive + header + area de contenido. */
export default function AppLayout() {
  const { todos } = useData();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [todoModalOpen, setTodoModalOpen] = useState(false);

  const pendingCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);

  return (
    <div className="flex min-h-screen w-full min-w-0 overflow-x-hidden bg-surface">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pendingCount={pendingCount}
        onCreateFolder={() => setFolderModalOpen(true)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenSidebar={() => setSidebarOpen(true)} onCreateTodo={() => setTodoModalOpen(true)} />

        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-6xl min-w-0 flex-1 overflow-x-hidden px-3 py-4 sm:px-5 sm:py-6 md:px-6 md:py-8 lg:px-8"
        >
          <Outlet />
        </motion.main>
      </div>

      <FolderFormModal open={folderModalOpen} onClose={() => setFolderModalOpen(false)} />
      <TodoFormModal open={todoModalOpen} onClose={() => setTodoModalOpen(false)} />
    </div>
  );
}
