import { useEffect } from 'react';
import api from '../api/api';
import { useAuthStore } from '../store/useAuthStore';

export default function Profile() {
  const { token, user, setUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const res = await api.get(`/users/${payload.userId}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [token, setUser]);

  if (!user) return <p className="text-center mt-10">Cargando perfil...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="text-gray-500 mb-4">{user.email}</p>
      <h3 className="font-semibold mb-2">Mis publicaciones:</h3>
      <ul>
        {user.posts.map((p: any) => (
          <li key={p.id} className="border-b py-2">{p.content}</li>
        ))}
      </ul>
    </div>
  );
}
