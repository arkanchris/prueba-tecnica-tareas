import axios from 'axios'

// Función que obtiene el token guardado
const getToken = () => localStorage.getItem('token')

const taskApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

// Esto agrega el token automáticamente a CADA petición
taskApi.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const getAllTasks = () => taskApi.get('tasks/')
export const getTask = (id) => taskApi.get(`tasks/${id}/`)
export const createTask = (task) => taskApi.post('tasks/', task)
export const updateTask = (id, task) => taskApi.put(`tasks/${id}/`, task)
export const deleteTask = (id) => taskApi.delete(`tasks/${id}/`)

// Autenticación
export const loginUser = (credentials) => taskApi.post('auth/login/', credentials)
export const registerUser = (userData) => taskApi.post('auth/register/', userData)