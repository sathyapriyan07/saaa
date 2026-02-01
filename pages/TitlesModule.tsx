import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Layout from './AdminDashboard';

const TitlesModule: React.FC<{ user: any }> = ({ user }) => {
  const [titles, setTitles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ title: '', year: '', type: 'movie', poster: '', overview: '' });

  useEffect(() => {
    fetchTitles();
  }, []);

  async function fetchTitles() {
    setLoading(true);
    const { data, error } = await supabase.from('titles').select('*').order('year', { ascending: false });
    console.log('Supabase titles:', { data, error }); // DEBUG
    if (!error) setTitles(data || []);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await supabase.from('titles').update(form).eq('id', editing.id);
    } else {
      await supabase.from('titles').insert(form);
    }
    setEditing(null);
    setForm({ title: '', year: '', type: 'movie', poster: '', overview: '' });
    fetchTitles();
  }

  async function handleDelete(id: string) {
    await supabase.from('titles').delete().eq('id', id);
    fetchTitles();
  }

  function handleEdit(t: any) {
    setEditing(t);
    setForm({
      title: t.title || '',
      year: t.year || '',
      type: t.type || 'movie',
      poster: t.poster || '',
      overview: t.overview || ''
    });
  }

  return (
    <Layout title="Titles" user={user}>
      <div className="space-y-8">
        <form onSubmit={handleSave} className="flex flex-wrap gap-2 mb-6 items-end">
          <input className="px-3 py-2 rounded bg-gray-800 text-white" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" required />
          <input className="px-3 py-2 rounded bg-gray-800 text-white w-20" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="Year" required />
          <select className="px-3 py-2 rounded bg-gray-800 text-white" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
          <input className="px-3 py-2 rounded bg-gray-800 text-white" value={form.poster} onChange={e => setForm(f => ({ ...f, poster: e.target.value }))} placeholder="Poster URL" />
          <input className="px-3 py-2 rounded bg-gray-800 text-white flex-1" value={form.overview} onChange={e => setForm(f => ({ ...f, overview: e.target.value }))} placeholder="Overview" />
          <button type="submit" className="bg-white text-black px-4 py-2 rounded font-bold">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({ title: '', year: '', type: 'movie', poster: '', overview: '' }); }} className="ml-2 text-xs text-gray-400">Cancel</button>}
        </form>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="space-y-2">
            {titles.map(t => (
              <li key={t.id} className="flex items-center gap-2">
                <span className="flex-1">{t.title} ({t.year}) [{t.type}]</span>
                <button onClick={() => handleEdit(t)} className="text-xs text-blue-400">Edit</button>
                <button onClick={() => handleDelete(t.id)} className="text-xs text-red-400">Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default TitlesModule;
