import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Layout from './AdminDashboard';

const HomeSectionsModule: React.FC<{ user: any }> = ({ user }) => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchSections();
  }, []);

  async function fetchSections() {
    setLoading(true);
    const { data, error } = await supabase.from('home_sections').select('*').order('order');
    if (!error) setSections(data || []);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await supabase.from('home_sections').update({ title }).eq('id', editing.id);
    } else {
      await supabase.from('home_sections').insert({ title });
    }
    setEditing(null);
    setTitle('');
    fetchSections();
  }

  async function handleDelete(id: string) {
    await supabase.from('home_sections').delete().eq('id', id);
    fetchSections();
  }

  return (
    <Layout title="Home Sections" user={user}>
      <div className="space-y-8">
        <form onSubmit={handleSave} className="flex gap-2 mb-6">
          <input
            className="px-3 py-2 rounded bg-gray-800 text-white"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Section title"
            required
          />
          <button type="submit" className="bg-white text-black px-4 py-2 rounded font-bold">
            {editing ? 'Update' : 'Add'}
          </button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setTitle(''); }} className="ml-2 text-xs text-gray-400">Cancel</button>
          )}
        </form>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="space-y-2">
            {sections.map(s => (
              <li key={s.id} className="flex items-center gap-2">
                <span className="flex-1">{s.title}</span>
                <button onClick={() => { setEditing(s); setTitle(s.title); }} className="text-xs text-blue-400">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="text-xs text-red-400">Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default HomeSectionsModule;
