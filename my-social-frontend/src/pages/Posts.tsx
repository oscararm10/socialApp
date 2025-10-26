import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = async () => {
    const res = await api.get('/posts');
    setPosts(res.data);
  };

  const likePost = async (id: string) => {
    try {
      await api.post(`/posts/${id}/like`);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
      {posts.map((p) => (
        <div key={p.id} className="bg-white p-4 rounded shadow">
          <p className="text-gray-800">{p.content}</p>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Autor: {p.author.name}</span>
            <button onClick={() => likePost(p.id)} className="text-blue-600 hover:underline">👍 {p.likes}</button>
          </div>
        </div>
      ))}
    </div>
  );
}
