import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Star, ExternalLink, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function MagazineDetail() {
  const { id } = useParams();

  const [magazine, setMagazine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMagazine();
  }, [id]);

  async function fetchMagazine() {
    const { data, error } = await supabase
      .from('magazines')
      .select('*')
      .eq('id', Number(id))
      .single();

    if (error) {
      console.error(error);
      setMagazine(null);
    } else {
      setMagazine(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-zinc-400">Загрузка...</p>
      </div>
    );
  }

  if (!magazine) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-3">Журнал не найден</h2>
          <Link
            to="/"
            className="text-amber-500 hover:underline flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-4 h-4" /> Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const rating = Number(magazine.rating) || 0;
  const roundedRating = Math.round(rating);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* BACK */}
      <Link
        to="/"
        className="inline-flex items-center gap-3 text-zinc-500 hover:text-white group mb-12 transition"
      >
        <div className="w-10 h-10 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="text-lg">Назад ко всем журналам</span>
      </Link>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* COVER */}
        <div className="lg:col-span-5">
          <div className="sticky top-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={magazine.cover}
                alt={magazine.title}
                className="w-full aspect-[5/6.5] object-cover"
              />
            </div>

            <div className="mt-6 flex gap-4">
              {magazine.pdf_url && (
                <>
                  <a
                    href={magazine.pdf_url}
                    download
                    className="flex-1 flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-medium hover:bg-amber-400 transition"
                  >
                    <Download className="w-5 h-5" />
                    Скачать PDF
                  </a>

                  <a
                    href={magazine.pdf_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 border border-white/20 py-4 rounded-2xl hover:bg-white/5 transition"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Читать онлайн
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <div className="uppercase text-xs text-amber-500 tracking-[2px] mb-2">
              {magazine.category || 'Журнал'}
            </div>
            <h1 className="text-5xl font-bold">{magazine.title}</h1>
            <p className="text-xl text-zinc-400 mt-3">{magazine.issue}</p>
          </div>

          <p className="text-lg text-zinc-300 leading-relaxed">
            {magazine.long_description || magazine.description}
          </p>

          {/* ⭐ RATING — теперь только просмотр */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8">
            <p className="text-sm text-zinc-400 mb-4">Оценка журнала</p>

            <div className="flex items-center gap-6">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-10 h-10 transition-all duration-200 ${
                      star <= roundedRating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-semibold text-amber-400">
                  {rating ? rating.toFixed(1) : '—'}
                </span>
                <span className="text-zinc-500 text-2xl">/ 5.0</span>
              </div>
            </div>

            {rating === 0 && (
              <p className="text-amber-500/70 text-sm mt-3">
                Ещё нет оценок. Будьте первым!
              </p>
            )}
          </div>

          {/* META */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <span className="text-zinc-500">Издатель</span>
              <p className="mt-1 font-medium">MAGNÉT Studio</p>
            </div>
            <div>
              <span className="text-zinc-500">Год</span>
              <p className="mt-1 font-medium">2025</p>
            </div>
          </div>

          {/* SHARE */}
          <div className="flex items-center gap-4 pt-6 border-t border-white/10">
            <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
              <Share2 className="w-5 h-5" />
              Поделиться
            </button>
          </div>
        </div>
      </div>

      {/* PDF VIEW */}
     {/* PDF VIEW — улучшенная версия */}
{magazine.pdf_url && (
  <div className="mt-24">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Онлайн просмотр</h2>
      <a
        href={magazine.pdf_url}
        target="_blank"
        rel="noreferrer"
        className="text-amber-500 hover:underline flex items-center gap-1.5"
      >
        Открыть PDF напрямую <ExternalLink size={16} />
      </a>
    </div>

    <div className="bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 h-[800px]">
      <iframe
        src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(magazine.pdf_url)}`}
        className="w-full h-full"
        title={magazine.title}
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
  </div>
)}
    </div>
  );
}