import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">MySocial</h1>
      <div className="flex gap-4">
        {token ? (
          <>
            <Link to="/posts">Publicaciones</Link>
            <Link to="/profile">Perfil</Link>
            <Link to="/create">Crear</Link>
            <button onClick={handleLogout} className="text-red-500">Salir</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
