import { Link } from "react-router-dom";
import Button from "@/components/ui/Button.jsx";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-surface px-4 text-center">
      <div>
        <p className="font-display text-6xl font-bold text-brand-400">404</p>
        <h1 className="mt-3 text-xl font-semibold text-ink">Página no encontrada</h1>
        <p className="mt-1 text-sm text-ink-muted">La página que buscas no existe o fue movida.</p>
        <Button as={Link} to="/" className="mt-6">
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
