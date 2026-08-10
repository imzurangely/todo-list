import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";
import NotFoundPage from "./components/layout/NotFoundPage.jsx";
import ProtectedRoute from "./features/auth/components/ProtectedRoute.jsx";
import PublicRoute from "./features/auth/components/PublicRoute.jsx";
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import RegisterPage from "./features/auth/pages/RegisterPage.jsx";
import DashboardPage from "./features/todos/pages/DashboardPage.jsx";
import TodosPage from "./features/todos/pages/TodosPage.jsx";
import FoldersPage from "./features/folders/pages/FoldersPage.jsx";
import FolderDetailPage from "./features/folders/pages/FolderDetailPage.jsx";
import NotesPage from "./features/notes/pages/NotesPage.jsx";

/** Composicion de providers y definicion de rutas. */
export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="tareas" element={<TodosPage />} />
                  <Route path="carpetas" element={<FoldersPage />} />
                  <Route path="carpetas/:folderId" element={<FolderDetailPage />} />
                  <Route path="notas" element={<NotesPage />} />
                </Route>
              </Route>

              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
