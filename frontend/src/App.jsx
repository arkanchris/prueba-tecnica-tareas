import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TasksPage } from './pages/TasksPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

// Si no hay token, redirige al login
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige la raíz al login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Páginas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Páginas privadas - solo si hay token */}
        <Route path="/tasks" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
        <Route path="/tasks-create" element={<PrivateRoute><TaskFormPage /></PrivateRoute>} />
        <Route path="/tasks/:id" element={<PrivateRoute><TaskFormPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App