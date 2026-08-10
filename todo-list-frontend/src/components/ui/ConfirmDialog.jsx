import Button from "./Button.jsx";
import Modal from "./Modal.jsx";

/** Confirmacion reutilizable para acciones destructivas. */
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  loading = false,
  title = "Confirmar accion",
  message = "Esta accion no se puede deshacer.",
  confirmLabel = "Eliminar",
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-ink-soft">{message}</p>
    </Modal>
  );
}
