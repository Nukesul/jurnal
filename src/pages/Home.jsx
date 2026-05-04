import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import MagazineCard from '../components/MagazineCard';

export default function Home() {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMagazines() {
      const { data, error } = await supabase
        .from('magazines')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error(error);
      else setMagazines(data || []);
      setLoading(false);
    }

    fetchMagazines();
  }, []);

  if (loading) return <div className="text-center py-20">Загрузка...</div>;

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-20">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter magazine-title mb-4">
          Современные журналы
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {magazines.map(mag => (
          <MagazineCard key={mag.id} magazine={mag} />
        ))}
      </div>
    </main>
  );
}