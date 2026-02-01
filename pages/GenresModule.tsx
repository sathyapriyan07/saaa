import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Layout from './AdminDashboard';

const GenresModule: React.FC<{ user: any }> = ({ user }) => {
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchGenres();
  }, []);

  async function fetchGenres() {
    setLoading(true);
    const { data, error } = await supabase.from('genres').select('*').order('name');
    if (!error) setGenres(data || []);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await supabase.from('genres').update({ name }).eq('id', editing.id);
    } else {
      await supabase.from('genres').insert({ name });
    }
    setEditing(null);
    setName('');
    fetchGenres();
  }

  async function handleDelete(id: string) {
    await supabase.from('genres').delete().eq('id', id);
    fetchGenres();
  }

  return (
    <Layout title="Genres" user={user}>
      <div className="space-y-8">
        <form onSubmit={handleSave} className="flex gap-2 mb-6">
          <input
            className="px-3 py-2 rounded bg-gray-800 text-white"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Genre name"
            required
          />
          <button type="submit" className="bg-white text-black px-4 py-2 rounded font-bold">
            {editing ? 'Update' : 'Add'}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setName(''); }} className="ml-2 text-xs text-gray-400">Cancel</button>
          )}
        </form>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="space-y-2">
            {genres.map(g => (
              <li key={g.id} className="flex items-center gap-2">
                <span className="flex-1">{g.name}</span>
                <button onClick={() => { setEditing(g); setName(g.name); }} className="text-xs text-blue-400">Edit</button>
                <button onClick={() => handleDelete(g.id)} className="text-xs text-red-400">Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default GenresModule;
