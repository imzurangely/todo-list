import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import Button from "@/components/ui/Button.jsx";
import Input from "@/components/ui/Input.jsx";
import useAuth from "../hooks/useAuth.js";
import { useToast } from "@/context/ToastContext.jsx";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (values.name.trim().length < 2) nextErrors.name = "Ingresa tu nombre";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) nextErrors.email = "Ingresa un correo válido";
    if (values.password.length < 6) nextErrors.password = "Mínimo 6 caracteres";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      toast.success("Cuenta creada correctamente");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Crear cuenta"
      subtitle="Organiza tus pendientes en un solo lugar."
      footer={
        <>
          Ya tienes cuenta?{" "}
          <Link to="/login" className="font-semibold text-brand-600 hover:underline dark:text-brand-300">
            Iniciar sesion
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Nombre"
          name="name"
          autoComplete="name"
          placeholder="Tu nombre"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
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
          autoComplete="new-password"
          placeholder="Mínimo 6 caracteres"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button type="submit" fullWidth loading={loading}>
          Crear cuenta
        </Button>
      </form>
    </AuthLayout>
  );
}
