import { AnimatePresence, motion } from "framer-motion";
import { FolderClosed, LayoutDashboard, ListChecks, LogOut, Plus, StickyNote, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button.jsx";
import IconButton from "@/components/ui/IconButton.jsx";
import Badge from "@/components/ui/Badge.jsx";
import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import useAuth from "@/features/auth/hooks/useAuth.js";
import useFolders from "@/features/folders/hooks/useFolders.js";
import { cn } from "@/utils/cn.js";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/tareas", label: "Todas las tareas", icon: ListChecks },
  { to: "/carpetas", label: "Mis carpetas", icon: FolderClosed },
  { to: "/notas", label: "Notas", icon: StickyNote },
];

const linkClasses = ({ isActive }) =>
  cn(
    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-brand-50 text-brand-700 dark:bg-brand-900/35 dark:text-brand-200"
      : "text-ink-soft hover:bg-surface-muted hover:text-ink",
  );

function SidebarContent({ pendingCount, onNavigate, onCreateFolder }) {
  const { folders } = useFolders();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Logo />

      <div className="rounded-xl bg-brand-50 px-3 py-2.5 dark:bg-brand-900/25">
        <p className="text-xs font-medium text-brand-700 dark:text-brand-200">Tienes</p>
        <p className="font-display text-lg font-bold text-brand-700 dark:text-brand-100">
          {pendingCount} {pendingCount === 1 ? "tarea pendiente" : "tareas pendientes"}
        </p>
      </div>

      <nav className="space-y-1" aria-label="Navegacion principal">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={linkClasses} onClick={onNavigate}>
            <Icon className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{label}</span>
            {to === "/tareas" && pendingCount > 0 && (
              <Badge variant="brand" className="ml-auto">
                {pendingCount}
              </Badge>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Carpetas
        </p>
        <ul className="space-y-1">
          {folders.map((folder) => (
            <li key={folder.id}>
              <NavLink to={`/carpetas/${folder.id}`} className={linkClasses} onClick={onNavigate}>
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand-300" aria-hidden="true" />
                <span className="truncate">{folder.name}</span>
                <span className="ml-auto text-xs text-ink-muted">{folder.pending_count ?? 0}</span>
              </NavLink>
            </li>
          ))}
          {folders.length === 0 && (
            <li className="px-3 text-xs text-ink-muted">Aún no tienes carpetas.</li>
          )}
        </ul>
      </div>

      <div className="space-y-2">
        <Button size="sm" fullWidth onClick={onCreateFolder}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nueva carpeta
        </Button>
        <ThemeToggle withLabel />
        <div className="flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
            {(user?.name || "?").charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-ink">{user?.name}</span>
            <span className="block truncate text-xs text-ink-muted">{user?.email}</span>
          </span>
          <IconButton icon={LogOut} label="Cerrar sesion" tone="danger" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ open, onClose, pendingCount, onCreateFolder }) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-72 shrink-0 border-r border-line bg-card lg:block">
        <div className="sticky top-0 h-screen">
          <SidebarContent pendingCount={pendingCount} onCreateFolder={onCreateFolder} />
        </div>
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative z-10 h-full w-[85%] max-w-xs border-r border-line bg-card"
              aria-label="Menu lateral"
            >
              <div className="absolute right-3 top-3">
                <IconButton icon={X} label="Cerrar menu" onClick={onClose} />
              </div>
              <SidebarContent
                pendingCount={pendingCount}
                onNavigate={onClose}
                onCreateFolder={() => {
                  onClose();
                  onCreateFolder();
                }}
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
