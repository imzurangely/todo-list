import { useEffect, useState } from "react";
import Button from "@/components/ui/Button.jsx";
import Input from "@/components/ui/Input.jsx";
import Select from "@/components/ui/Select.jsx";
import Textarea from "@/components/ui/Textarea.jsx";
import { PRIORITIES, validateTodoForm } from "../utils/todoUtils.js";
import { toInputDate } from "@/utils/date.js";

const emptyValues = (defaultFolderId) => ({
  title: "",
  description: "",
  due_date: "",
  priority: "media",
  folder_id: defaultFolderId ? String(defaultFolderId) : "",
});

export default function TodoForm({ todo, folders, defaultFolderId, onSubmit, onCancel, submitting }) {
  const [values, setValues] = useState(emptyValues(defaultFolderId));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(
      todo
        ? {
            title: todo.title,
            description: todo.description || "",
            due_date: toInputDate(todo.due_date),
            priority: todo.priority,
            folder_id: String(todo.folder_id),
          }
        : emptyValues(defaultFolderId),
    );
    setErrors({});
  }, [todo, defaultFolderId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateTodoForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      title: values.title.trim(),
      description: values.description.trim() || null,
      due_date: values.due_date || null,
      priority: values.priority,
      folder_id: Number(values.folder_id),
    });
  };

  const folderOptions = [
    { value: "", label: "Selecciona una carpeta" },
    ...folders.map((folder) => ({ value: folder.id, label: folder.name })),
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Input
        label="Titulo *"
        name="title"
        value={values.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="Ej. Preparar la presentación"
        maxLength={120}
        autoFocus
      />

      <Textarea
        label="Descripcion"
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="Detalles opcionales de la tarea"
        maxLength={1000}
        rows={3}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Fecha para realizarla"
          name="due_date"
          type="date"
          value={values.due_date}
          onChange={handleChange}
          error={errors.due_date}
        />
        <Select
          label="Prioridad"
          name="priority"
          value={values.priority}
          onChange={handleChange}
          error={errors.priority}
          options={PRIORITIES}
        />
      </div>

      <Select
        label="Carpeta *"
        name="folder_id"
        value={values.folder_id}
        onChange={handleChange}
        error={errors.folder_id}
        options={folderOptions}
      />

      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Cancelar
        </Button>
        <Button type="submit" loading={submitting}>
          {todo ? "Guardar cambios" : "Crear tarea"}
        </Button>
      </div>
    </form>
  );
}
