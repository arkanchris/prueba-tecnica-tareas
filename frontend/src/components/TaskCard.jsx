import { deleteTask, updateTask } from "../api/tasks.api";
import { useNavigate } from "react-router-dom";

export function TaskCard({ task, onDelete, onToggle }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (confirm("¿Eliminar esta tarea?")) {
            await deleteTask(task.id);
            onDelete(task.id);
        }
    };

    const handleToggle = async () => {
        await updateTask(task.id, { ...task, completed: !task.completed });
        onToggle(task.id);
    };

    return (
        <div className="task-card">
            <div className="task-card-header">
                <span className={`task-status-dot ${task.completed ? "done" : "pending"}`}></span>
                <span className={`task-badge ${task.completed ? "done" : "pending"}`}>
                    {task.completed ? "Completada" : "Pendiente"}
                </span>
            </div>

            <h2 className="task-title">{task.title}</h2>
            {task.description && <p className="task-desc">{task.description}</p>}

            <div className="task-date">
                {new Date(task.created_at).toLocaleDateString("es-CO", {
                    day: "numeric", month: "short", year: "numeric"
                })}
            </div>

            <div className="task-actions">
                <button className="btn-toggle" onClick={handleToggle} title={task.completed ? "Marcar pendiente" : "Marcar completada"}>
                    {task.completed ? "↩ Reabrir" : "✓ Completar"}
                </button>
                <button className="btn-edit" onClick={() => navigate(`/tasks/${task.id}`)}>
                    ✎ Editar
                </button>
                <button className="btn-delete" onClick={handleDelete}>
                    ✕
                </button>
            </div>
        </div>
    );
}
