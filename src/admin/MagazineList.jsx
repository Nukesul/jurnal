import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function MagazineList({ onEdit }) {
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    fetchMagazines();
  }, []);

  async function fetchMagazines() {
    const { data, error } = await supabase
      .from('magazines')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setMagazines(data);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm('Удалить журнал?');
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('magazines')
      .delete()
      .eq('id', id);

    if (!error) fetchMagazines();
  }

  return (
    <div className="space-y-4">
      {magazines.map(m => (
        <div 
          key={m.id} 
          className="p-4 border rounded-2xl flex gap-4 items-center bg-white dark:bg-zinc-800"
        >
          {/* 📸 КАРТИНКА */}
          {m.cover && (
            <img 
              src={m.cover} 
              alt={m.title}
              className="w-20 h-28 object-cover rounded-xl"
            />
          )}

          {/* 📄 ИНФО */}
          <div className="flex-1">
            <h3 className="font-bold text-lg">{m.title}</h3>
            <p className="text-sm text-gray-500">{m.category}</p>
            <p className="text-xs text-gray-400">{m.issue}</p>

            {/* 📄 PDF */}
            {m.pdf_url && (
              <a 
                href={m.pdf_url} 
                target="_blank" 
                className="text-blue-500 text-sm underline"
              >
                Открыть PDF
              </a>
            )}
          </div>

          {/* 🔘 КНОПКИ */}
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => onEdit(m)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>

            <button 
              onClick={() => handleDelete(m.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}