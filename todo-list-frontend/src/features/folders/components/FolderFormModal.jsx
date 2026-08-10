import { useEffect, useState } from "react";
import Button from "@/components/ui/Button.jsx";
import Input from "@/components/ui/Input.jsx";
import Modal from "@/components/ui/Modal.jsx";
import useFolders from "../hooks/useFolders.js";
import { useToast } from "@/context/ToastContext.jsx";
import { validateFolderName } from "../utils/folderUtils.js";

/** Modal para crear y renombrar carpetas. */
export default function FolderFormModal({ open, onClose, folder }) {
  const { createFolder, updateFolder } = useFolders();
  const toast = useToast();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setName(folder?.name || "");
    setError(null);
  }, [folder, open]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateFolderName(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      if (folder) {
        await updateFolder(folder.id, { name: name.trim() });
        toast.success("Carpeta actualizada correctamente");
      } else {
        await createFolder({ name: name.trim() });
        toast.success("Carpeta creada correctamente");
      }
      onClose();
    } catch (requestError) {
      toast.error(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title={folder ? "Editar carpeta" : "Nueva carpeta"}
      description="Las carpetas te ayudan a agrupar tus tareas por contexto."
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Nombre de la carpeta *"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError(null);
          }}
          error={error}
          placeholder="Ej. Trabajo, Universidad, Portafolio"
          maxLength={60}
          autoFocus
        />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
            Cancelar
          </Button>
          <Button type="submit" loading={submitting}>
            {folder ? "Guardar cambios" : "Crear carpeta"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
