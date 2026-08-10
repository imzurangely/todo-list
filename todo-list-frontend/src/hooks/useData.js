import { useContext } from "react";
import { DataContext } from "@/context/DataContext.jsx";

/** Acceso al estado compartido de carpetas, tareas y notas. */
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData debe usarse dentro de DataProvider");
  return context;
};

export default useData;
