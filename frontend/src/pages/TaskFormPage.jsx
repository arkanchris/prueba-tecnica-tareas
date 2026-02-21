import { useForm } from "react-hook-form";
import { createTask, getTask, updateTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export function TaskFormPage() {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    useEffect(() => {
        if (isEditing) {
            async function loadTask() {
                const res = await getTask(id);
                setValue("title", res.data.title);
                setValue("description", res.data.description);
                setValue("completed", res.data.completed);
            }
            loadTask();
        }
    }, [id]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (isEditing) {
                await updateTask(id, data);
            } else {
                await createTask(data);
            }
            navigate("/tasks");
        } catch (error) {
            alert("Error al guardar la tarea");
        }
    });

    return (
        <div className="form-page">
            <div className="form-card">
                <button className="btn-back" onClick={() => navigate("/tasks")}>
                    ← Volver
                </button>
                <h1 className="form-title">{isEditing ? "Editar Tarea" : "Nueva Tarea"}</h1>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Título *</label>
                        <input
                            type="text"
                            placeholder="¿Qué necesitas hacer?"
                            {...register("title", { required: true })}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Descripción</label>
                        <textarea
                            rows="4"
                            placeholder="Detalles adicionales (opcional)..."
                            {...register("description")}
                            className="form-input"
                        ></textarea>
                    </div>

                    {isEditing && (
                        <div className="form-group checkbox-group">
                            <input
                                type="checkbox"
                                id="completed"
                                {...register("completed")}
                                className="form-checkbox"
                            />
                            <label htmlFor="completed" className="form-label-inline">
                                Marcar como completada
                            </label>
                        </div>
                    )}

                    <button type="submit" className="btn-submit">
                        {isEditing ? "Guardar Cambios" : "Crear Tarea"}
                    </button>
                </form>
            </div>
        </div>
    );
}
