import { useMemo } from "react";
import useData from "@/hooks/useData.js";

/** Carpetas del usuario con contadores derivados y acciones CRUD. */
export function useFolders() {
  const { folders, loading, error, createFolder, updateFolder, deleteFolder, refresh } = useData();

  const options = useMemo(
    () => folders.map((folder) => ({ value: folder.id, label: folder.name })),
    [folders],
  );

  const getFolderById = (id) => folders.find((folder) => folder.id === Number(id)) || null;

  return { folders, options, getFolderById, loading, error, createFolder, updateFolder, deleteFolder, refresh };
}

export default useFolders;
