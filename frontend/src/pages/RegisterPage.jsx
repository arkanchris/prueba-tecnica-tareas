import { useForm } from "react-hook-form";
import { registerUser } from "../api/tasks.api";
import { useNavigate, Link } from "react-router-dom";

export function RegisterPage() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await registerUser(data);
            alert("¡Cuenta creada! Ahora inicia sesión.");
            navigate("/login");
        } catch (error) {
            alert("Error al registrar. El usuario puede que ya exista.");
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
                    <h2 className="auth-title">Crear cuenta</h2>
                    <p className="auth-subtitle">Es gratis y toma menos de un minuto</p>

                    <form onSubmit={onSubmit} className="auth-form">
                        <div className="form-group">
                            <label className="form-label">Usuario</label>
                            <input
                                type="text"
                                placeholder="Elige un nombre de usuario"
                                {...register("username", { required: true })}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email <span className="optional">(opcional)</span></label>
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                {...register("email")}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                placeholder="Mínimo 8 caracteres"
                                {...register("password", { required: true })}
                                className="form-input"
                            />
                        </div>
                        <button type="submit" className="btn-auth">
                            Crear cuenta →
                        </button>
                    </form>

                    <p className="auth-switch">
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/login" className="auth-link">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
