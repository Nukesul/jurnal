import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Star, 
  ExternalLink, 
  Share2, 
  Calendar, 
  MessageSquare, 
  MoreVertical, 
  Edit2, 
  Trash2 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function MagazineDetail() {
  const { id } = useParams();
  
  const [magazine, setMagazine] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  // Новые состояния для редактирования и удаления
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchMagazine();
    fetchComments();
  }, [id]);

  const fetchUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
  };

  async function fetchMagazine() {
    const { data } = await supabase
      .from('magazines')
      .select('*')
      .eq('id', Number(id))
      .single();

    setMagazine(data);
    setLoading(false);
  }

  async function fetchComments() {
    const { data } = await supabase
      .from('comments')
      .select(`
        id,
        text,
        created_at,
        user_id,
        profiles(nickname)
      `)
      .eq('magazine_id', Number(id))
      .order('created_at', { ascending: false });

    setComments(data || []);
  }

  const handleDownload = async () => {
    if (!magazine?.pdf_url) return;
    if (!user) {
      alert('Войдите в аккаунт, чтобы скачать журнал');
      return;
    }

    await supabase.from('downloads').insert({
      user_id: user.id,
      magazine_id: Number(id)
    });

    const link = document.createElement('a');
    link.href = magazine.pdf_url;
    link.download = `${magazine.title || 'journal'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setSubmitting(true);

    const { error } = await supabase
      .from('comments')
      .insert({
        user_id: user.id,
        magazine_id: Number(id),
        text: newComment.trim()
      });

    if (!error) {
      setNewComment('');
      fetchComments();
    } else {
      alert('Ошибка при отправке комментария');
    }

    setSubmitting(false);
  };

  // ==================== РЕДАКТИРОВАНИЕ ====================
  const startEditing = (comment) => {
    setEditingCommentId(comment.id);
    setEditedText(comment.text);
  };

  const handleEditComment = async () => {
    if (!editedText.trim() || !editingCommentId) return;

    const { error } = await supabase
      .from('comments')
      .update({ text: editedText.trim() })
      .eq('id', editingCommentId);

    if (!error) {
      setEditingCommentId(null);
      setEditedText('');
      fetchComments();
    } else {
      alert('Ошибка при редактировании комментария');
    }
  };

  // ==================== УДАЛЕНИЕ ====================
  const requestDelete = (commentId) => {
    setDeleteConfirm(commentId);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', deleteConfirm);

    if (!error) {
      fetchComments();
    } else {
      alert('Ошибка при удалении комментария');
    }

    setDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const getDisplayName = (comment) => {
    return comment?.profiles?.nickname || 'Читатель';
  };

  const isOwnComment = (comment) => {
    return user && comment.user_id === user.id;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-zinc-700 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-zinc-400">Загрузка журнала...</p>
        </div>
      </div>
    );
  }

  if (!magazine) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <h2 className="text-3xl font-medium mb-4">Журнал не найден</h2>
          <Link to="/" className="text-amber-500 hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const rating = Number(magazine.rating) || 0;
  const roundedRating = Math.round(rating);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 md:py-12">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2.5 text-zinc-400 hover:text-white mb-8 md:mb-12 group"
      >
        <div className="w-10 h-10 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="text-base md:text-lg">Все журналы</span>
      </Link>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* COVER */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <img
                src={magazine.cover}
                alt={magazine.title}
                className="w-full aspect-[5/6.2] md:aspect-[5/6.5] object-cover"
              />
            </div>

            {magazine.pdf_url && (
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-medium hover:bg-amber-400 active:scale-95 transition-all text-base"
                >
                  <Download className="w-5 h-5" />
                  Скачать PDF
                </button>

                <a
                  href={magazine.pdf_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 border border-white/20 py-4 rounded-2xl hover:bg-white/5 active:scale-95 transition-all text-base"
                >
                  <ExternalLink className="w-5 h-5" />
                  Читать онлайн
                </a>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-7 space-y-10 md:space-y-12">
          <div>
            <div className="uppercase text-xs tracking-[2px] text-amber-500 font-medium mb-2">
              {magazine.category || 'Журнал'}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight font-medium">
              {magazine.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-zinc-400 flex items-center gap-2">
              <Calendar className="w-5 h-5 flex-shrink-0" />
              {magazine.issue}
            </p>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-[17px] md:text-lg leading-relaxed text-zinc-300">
              {magazine.long_description || magazine.description}
            </p>
          </div>

          {/* Rating */}
          <div className="bg-zinc-900/60 border border-white/10 rounded-3xl p-7 md:p-9">
            <p className="uppercase text-xs tracking-widest text-zinc-500 mb-5">Оценка</p>
            <div className="flex flex-wrap items-end gap-6 md:gap-8">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-10 h-10 md:w-12 md:h-12 ${
                      star <= roundedRating ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <div className="pb-1">
                <span className="text-5xl md:text-6xl font-semibold text-amber-400 tabular-nums">
                  {rating ? rating.toFixed(1) : '—'}
                </span>
                <span className="text-zinc-500 text-2xl">/ 5.0</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <button className="flex items-center gap-3 text-zinc-400 hover:text-white transition">
              <Share2 className="w-5 h-5" />
              Поделиться журналом
            </button>
          </div>
        </div>
      </div>

      {/* ====================== КОММЕНТАРИИ ====================== */}
      <div className="mt-20 md:mt-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="w-7 h-7 text-amber-500" />
          <h2 className="text-2xl font-semibold">Комментарии</h2>
          <span className="text-zinc-500">({comments.length})</span>
        </div>

        {/* Поле для комментария */}
        {user ? (
          <form onSubmit={handleAddComment} className="mb-10">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Напишите комментарий..."
              className="w-full min-h-[110px] bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-white/10 rounded-2xl p-5 focus:outline-none focus:border-amber-500 resize-y text-[17px]"
            />
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="mt-3 px-8 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black font-medium rounded-2xl transition"
            >
              {submitting ? 'Отправка...' : 'Опубликовать'}
            </button>
          </form>
        ) : (
          <Link
            to="/login"
            className="block text-center bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 py-4 rounded-2xl text-amber-500 font-medium mb-10"
          >
            Войдите, чтобы оставлять комментарии
          </Link>
        )}

        {/* Список комментариев */}
        <div className="space-y-8">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-100 to-violet-100 flex items-center justify-center text-white flex-shrink-0">
                  👤
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{getDisplayName(comment)}</p>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-500">
                        {new Date(comment.created_at).toLocaleDateString('ru-RU')}
                      </span>

                      {isOwnComment(comment) && (
                        <div className="relative">
                          <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition opacity-0 group-hover:opacity-100">
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Меню */}
                          <div className="absolute right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-xl py-1 w-44 text-sm shadow-2xl z-20 hidden group-hover:block">
                            <button
                              onClick={() => startEditing(comment)}
                              className="w-full px-4 py-2 hover:bg-zinc-800 flex items-center gap-2 text-left"
                            >
                              <Edit2 className="w-4 h-4" />
                              Редактировать
                            </button>
                            <button
                              onClick={() => requestDelete(comment.id)}
                              className="w-full px-4 py-2 hover:bg-zinc-800 flex items-center gap-2 text-left text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                              Удалить
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Редактирование */}
                  {editingCommentId === comment.id ? (
                    <div className="mt-3">
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full min-h-[100px] bg-zinc-800 border border-amber-500 rounded-2xl p-4 text-[16px]"
                      />
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={handleEditComment}
                          className="px-5 py-2 bg-amber-500 text-black font-medium rounded-xl hover:bg-amber-400"
                        >
                          Сохранить
                        </button>
                        <button
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditedText('');
                          }}
                          className="px-5 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-xl"
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-1.5 text-[16px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {comment.text}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-12 text-zinc-500">Пока нет комментариев. Будьте первым!</p>
          )}
        </div>
      </div>

      {/* Модальное окно подтверждения удаления */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-3xl p-8 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-2">Удалить комментарий?</h3>
            <p className="text-zinc-400 mb-8">Это действие нельзя отменить.</p>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition"
              >
                Отмена
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-2xl transition font-medium"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}