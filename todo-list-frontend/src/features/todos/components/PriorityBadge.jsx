import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import Badge from "@/components/ui/Badge.jsx";

const CONFIG = {
  alta: { label: "Alta", icon: ArrowUp },
  media: { label: "Media", icon: Minus },
  baja: { label: "Baja", icon: ArrowDown },
};

/** Prioridad comunicada con color + icono + texto (no solo color). */
export default function PriorityBadge({ priority }) {
  const { label, icon } = CONFIG[priority] || CONFIG.media;
  return (
    <Badge variant={priority} icon={icon}>
      {label}
    </Badge>
  );
}
