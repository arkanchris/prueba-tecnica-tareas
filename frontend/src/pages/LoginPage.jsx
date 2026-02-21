import { useForm } from "react-hook-form";
import { loginUser } from "../api/tasks.api";
import { useNavigate, Link } from "react-router-dom";

export function LoginPage() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await loginUser(data);
            localStorage.setItem("token", res.data.access);
            navigate("/tasks");
        } catch (error) {
            alert("Usuario o contraseña incorrectos");
        }
    });

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-brand">
                    <span className="brand-icon-lg">◈</span>
                    <h1 className="auth-brand-name">Arka<span>Soft</span> Tasks</h1>
                    <p className="auth-brand-tagline">Organiza tu día. Logra más.</p>
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-card">
                    <h2 className="auth-title">Bienvenido de nuevo</h2>
                    <p className="auth-subtitle">Ingresa a tu cuenta para continuar</p>

                    <form onSubmit={onSubmit} className="auth-form">
                        <div className="form-group">
                            <label className="form-label">Usuario</label>
                            <input
                                type="text"
                                placeholder="Tu nombre de usuario"
                                {...register("username", { required: true })}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register("password", { required: true })}
                                className="form-input"
                            />
                        </div>
                        <button type="submit" className="btn-auth">
                            Iniciar Sesión →
                        </button>
                    </form>

                    <p className="auth-switch">
                        ¿No tienes cuenta?{" "}
                        <Link to="/register" className="auth-link">Regístrate gratis</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
