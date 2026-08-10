import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import Button from "@/components/ui/Button.jsx";
import Input from "@/components/ui/Input.jsx";
import useAuth from "../hooks/useAuth.js";
import { useToast } from "@/context/ToastContext.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) nextErrors.email = "Ingresa un correo válido";
    if (!values.password) nextErrors.password = "La contraseña es obligatoria";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login({ email: values.email.trim(), password: values.password });
      toast.success("Bienvenida de nuevo");
      navigate(location.state?.from || "/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Iniciar sesión"
      subtitle="Accede para gestionar tus tareas, carpetas y notas."
      footer={
        <>
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="font-semibold text-brand-600 hover:underline dark:text-brand-300">
            Crear una cuenta
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Correo electronico"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tucorreo@ejemplo.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button type="submit" fullWidth loading={loading}>
          Entrar
        </Button>
      </form>

      <p className="mt-4 rounded-xl bg-surface-muted px-3 py-2 text-xs text-ink-muted">
        Cuenta de demostración: <strong>demo@todolist.dev</strong> / <strong>demo1234</strong>
      </p>
    </AuthLayout>
  );
}
