import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Layout from './AdminDashboard';

const PeopleModule: React.FC<{ user: any }> = ({ user }) => {
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ name: '', biography: '', avatar: '' });

  useEffect(() => {
    fetchPeople();
  }, []);

  async function fetchPeople() {
    setLoading(true);
    const { data, error } = await supabase.from('people').select('*').order('name');
    if (!error) setPeople(data || []);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await supabase.from('people').update(form).eq('id', editing.id);
    } else {
      await supabase.from('people').insert(form);
    }
    setEditing(null);
    setForm({ name: '', biography: '', avatar: '' });
    fetchPeople();
  }

  async function handleDelete(id: string) {
    await supabase.from('people').delete().eq('id', id);
    fetchPeople();
  }

  function handleEdit(p: any) {
    setEditing(p);
    setForm({
      name: p.name || '',
      biography: p.biography || '',
      avatar: p.avatar || ''
    });
  }

  return (
    <Layout title="People" user={user}>
      <div className="space-y-8">
        <form onSubmit={handleSave} className="flex flex-wrap gap-2 mb-6 items-end">
          <input className="px-3 py-2 rounded bg-gray-800 text-white" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Name" required />
          <input className="px-3 py-2 rounded bg-gray-800 text-white flex-1" value={form.biography} onChange={e => setForm(f => ({ ...f, biography: e.target.value }))} placeholder="Biography" />
          <input className="px-3 py-2 rounded bg-gray-800 text-white" value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} placeholder="Avatar URL" />
          <button type="submit" className="bg-white text-black px-4 py-2 rounded font-bold">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: '', biography: '', avatar: '' }); }} className="ml-2 text-xs text-gray-400">Cancel</button>}
        </form>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="space-y-2">
            {people.map(p => (
              <li key={p.id} className="flex items-center gap-2">
                <span className="flex-1">{p.name}</span>
                <button onClick={() => handleEdit(p)} className="text-xs text-blue-400">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-xs text-red-400">Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default PeopleModule;
