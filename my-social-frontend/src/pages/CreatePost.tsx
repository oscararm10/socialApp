import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/posts', { content });
      navigate('/posts');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Crear publicación</h2>
      <form onSubmit={handleSubmit}>
        <textarea className="border w-full p-2 rounded mb-2" placeholder="¿Qué estás pensando?" value={content} onChange={(e) => setContent(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Publicar</button>
      </form>
    </div>
  );
}
