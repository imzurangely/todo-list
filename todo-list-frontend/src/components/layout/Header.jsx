import { Menu, Plus } from "lucide-react";
import Button from "@/components/ui/Button.jsx";
import IconButton from "@/components/ui/IconButton.jsx";
import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Header({ onOpenSidebar, onCreateTodo }) {
  return (
    <header className="sticky top-0 z-30 w-full min-w-0 border-b border-line bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-6 sm:py-3">
        <div className="flex items-center gap-2">
          <span className="lg:hidden">
            <IconButton icon={Menu} label="Abrir menu" onClick={onOpenSidebar} />
          </span>
          <span className="lg:hidden">
            <Logo compact />
          </span>
        </div>

        <div className="min-w-0" />

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden w-auto sm:block lg:hidden">
            <ThemeToggle />
          </span>
          <Button size="sm" onClick={onCreateTodo}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Nueva tarea</span>
            <span className="sm:hidden">Tarea</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
