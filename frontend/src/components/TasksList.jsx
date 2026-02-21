import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";

export function TasksList() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        async function loadTasks() {
            const res = await getAllTasks();
            setTasks(res.data);
        }
        loadTasks();
    }, []);

    const handleDelete = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));
    const handleToggle = (id) => setTasks((prev) =>
        prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
    );

    const filtered = tasks.filter((t) => {
        if (filter === "pending") return !t.completed;
        if (filter === "done") return t.completed;
        return true;
    });

    const total = tasks.length;
    const done = tasks.filter((t) => t.completed).length;
    const pending = total - done;

    return (
        <div>
            {/* Stats */}
            <div className="stats-row">
                <div className="stat-box">
                    <span className="stat-num">{total}</span>
                    <span className="stat-label">Total</span>
                </div>
                <div className="stat-box">
                    <span className="stat-num pending-color">{pending}</span>
                    <span className="stat-label">Pendientes</span>
                </div>
                <div className="stat-box">
                    <span className="stat-num done-color">{done}</span>
                    <span className="stat-label">Completadas</span>
                </div>
            </div>

            {/* Filtros */}
            <div className="filter-row">
                {["all", "pending", "done"].map((f) => (
                    <button
                        key={f}
                        className={`filter-btn ${filter === f ? "active" : ""}`}
                        onClick={() => setFilter(f)}
                    >
                        {f === "all" ? "Todas" : f === "pending" ? "Pendientes" : "Completadas"}
                    </button>
                ))}
            </div>

            {/* Grid de tareas */}
            {filtered.length === 0 ? (
                <div className="empty-state">
                    <p>No hay tareas aquí todavía</p>
                </div>
            ) : (
                <div className="tasks-grid">
                    {filtered.map((task) => (
                        <TaskCard key={task.id} task={task} onDelete={handleDelete} onToggle={handleToggle} />
                    ))}
                </div>
            )}
        </div>
    );
}
