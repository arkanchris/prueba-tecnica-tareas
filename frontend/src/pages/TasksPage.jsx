import { TasksList } from "../components/TasksList";
import { useNavigate } from "react-router-dom";

export function TasksPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="page-wrapper">
            <header className="main-header">
                <div className="header-brand">
                    <span className="brand-icon">◈</span>
                    <h1 className="brand-name">Arka<span>Soft</span> Tasks</h1>
                </div>
                <div className="header-actions">
                    <button className="btn-new" onClick={() => navigate("/tasks-create")}>
                        + Nueva Tarea
                    </button>
                    <button className="btn-logout" onClick={handleLogout}>
                        Salir
                    </button>
                </div>
            </header>
            <main className="main-content">
                <TasksList />
            </main>
        </div>
    );
}
