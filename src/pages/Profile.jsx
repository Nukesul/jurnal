import { ArrowLeft, Edit2, LogOut, Calendar, MessageSquare, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState(null);
    const [nickname, setNickname] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [downloads, setDownloads] = useState([]);
    const [userComments, setUserComments] = useState([]);

    const [loadingDownloads, setLoadingDownloads] = useState(false);
    const [loadingComments, setLoadingComments] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (!user) return;

        if (activeTab === 'downloads') {
            fetchDownloads();
        }

        if (activeTab === 'overview') {
            fetchUserComments();
            fetchDownloads();
        }
    }, [activeTab, user]);

    const fetchUserData = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            setLoading(false);
            return;
        }

        setUser(session.user);

        const { data: prof } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (prof) {
            setNickname(prof.nickname || session.user.email?.split('@')[0] || 'Читатель');
        } else {
            const defaultNickname = session.user.email?.split('@')[0] || 'Читатель';

            await supabase.from('profiles').insert({
                id: session.user.id,
                nickname: defaultNickname,
            });

            setNickname(defaultNickname);
        }

        setLoading(false);
    };

    const fetchDownloads = async () => {
        if (!user) return;

        setLoadingDownloads(true);

        const { data } = await supabase
            .from('downloads')
            .select(`
        downloaded_at,
        magazines(id, title, cover, issue, category)
      `)
            .eq('user_id', user.id)
            .order('downloaded_at', { ascending: false });

        setDownloads(data || []);
        setLoadingDownloads(false);
    };

    const fetchUserComments = async () => {
        if (!user) return;

        setLoadingComments(true);

        const { data } = await supabase
            .from('comments')
            .select(`
        id,
        text,
        created_at,
        magazines(id, title)
      `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        setUserComments(data || []);
        setLoadingComments(false);
    };

    const saveNickname = async () => {
        if (!nickname.trim() || !user) return;

        setSaving(true);

        const { error } = await supabase
            .from('profiles')
            .update({ nickname: nickname.trim() })
            .eq('id', user.id);

        if (!error) {
            setIsEditing(false);
            alert('Никнейм сохранён');
        }

        setSaving(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
    };

    if (loading) {
        return <div className="text-center py-20">Загрузка...</div>;
    }

    if (!user) {
        return <div className="text-center py-20">Пожалуйста, войдите в аккаунт</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10">
            <div className="max-w-5xl mx-auto px-5">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mb-8 text-zinc-500 hover:text-amber-500"
                >
                    <ArrowLeft className="w-5 h-5" />
                    На главную
                </Link>

                {/* HEADER */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 mb-8 text-center border border-zinc-200 dark:border-white/10">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-400 to-red-500 rounded-3xl flex items-center justify-center text-7xl mb-6">
                        👤
                    </div>

                    <div className="flex justify-center items-center gap-3 flex-wrap">
                        {isEditing ? (
                            <div className="flex gap-2 flex-wrap justify-center">
                                <input
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="px-5 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-xl"
                                />
                                <button
                                    onClick={saveNickname}
                                    disabled={saving}
                                    className="bg-amber-500 px-6 rounded-2xl text-white"
                                >
                                    {saving ? '...' : 'Сохранить'}
                                </button>
                            </div>
                        ) : (
                            <h1 className="text-3xl font-semibold">{nickname}</h1>
                        )}

                        <button onClick={() => setIsEditing(!isEditing)} className="text-amber-500">
                            <Edit2 size={22} />
                        </button>
                    </div>

                    <p className="text-zinc-500 mt-2">{user.email}</p>
                </div>

                {/* STATS */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border">
                        <p className="text-zinc-500 mb-2">Скачано журналов</p>
                        <p className="text-4xl font-bold text-amber-500">{downloads.length}</p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border">
                        <p className="text-zinc-500 mb-2">Комментариев</p>
                        <p className="text-4xl font-bold text-amber-500">{userComments.length}</p>
                    </div>
                </div>

                {/* TABS */}
                <div className="flex border-b mb-8 border-zinc-200 dark:border-white/10">
                    {['overview', 'downloads', 'settings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-4 text-center font-medium rounded-t-2xl transition ${activeTab === tab
                                    ? 'bg-white dark:bg-zinc-900 border-t border-x'
                                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'
                                }`}
                        >
                            {tab === 'overview' && 'Обзор'}
                            {tab === 'downloads' && 'Скачанные'}
                            {tab === 'settings' && 'Настройки'}
                        </button>
                    ))}
                </div>

                {/* CONTENT */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-white/10">

                    {/* OVERVIEW */}
                    {activeTab === 'overview' && (
                        <div>
                            <h2 className="text-2xl font-medium mb-6">Моя активность</h2>

                            {loadingComments ? (
                                <p>Загрузка...</p>
                            ) : userComments.length > 0 ? (
                                <div className="space-y-4">
                                    {userComments.map((comment) => (
                                        <Link
                                            key={comment.id}
                                            to={`/magazine/${comment.magazines?.id}`}
                                            className="block p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border hover:border-amber-500 hover:shadow-md transition"
                                        >
                                            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
                                                <MessageSquare className="w-4 h-4" />
                                                Комментарий к: {comment.magazines?.title}
                                            </div>

                                            <p className="mb-3">{comment.text}</p>

                                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(comment.created_at).toLocaleDateString('ru-RU')}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-zinc-500 py-10 text-center">
                                    Пока нет активности
                                </p>
                            )}
                        </div>
                    )}

                    {/* DOWNLOADS */}
                    {activeTab === 'downloads' && (
                        <div>
                            <h2 className="text-2xl font-medium mb-6">
                                Скачанные журналы ({downloads.length})
                            </h2>

                            {loadingDownloads ? (
                                <p>Загрузка...</p>
                            ) : downloads.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {downloads.map((item, index) => {
                                        const mag = item.magazines;
                                        return (
                                            <Link
                                                key={index}
                                                to={`/magazine/${mag.id}`}
                                                className="group bg-zinc-50 dark:bg-zinc-800 rounded-2xl overflow-hidden border hover:border-amber-500"
                                            >
                                                <img
                                                    src={mag.cover}
                                                    alt={mag.title}
                                                    className="w-full aspect-[5/6] object-cover"
                                                />
                                                <div className="p-4">
                                                    <h3 className="font-medium">{mag.title}</h3>
                                                    <p className="text-sm text-zinc-500">{mag.issue}</p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-center py-10 text-zinc-500">
                                    Вы ещё ничего не скачивали
                                </p>
                            )}
                        </div>
                    )}

                    {/* SETTINGS */}
                    {activeTab === 'settings' && (
                        <div>
                            <h2 className="text-2xl font-medium mb-6">Настройки</h2>
                            <p className="text-zinc-500">Раздел настроек скоро появится.</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleLogout}
                    className="mt-8 w-full py-4 text-red-500 hover:bg-red-500/10 rounded-2xl flex items-center justify-center gap-2"
                >
                    <LogOut className="w-5 h-5" />
                    Выйти
                </button>
            </div>
        </div>
    );
}