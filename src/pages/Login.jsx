import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/profile');
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        if (data.user) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            nickname: nickname || email.split('@')[0],
          });
        }

        alert('Регистрация успешна! Проверьте почту для подтверждения.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center px-5 py-12 transition-colors">
      <div className="w-full max-w-md">
        {/* Кнопка назад */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white mb-8 group"
        >
          <div className="w-9 h-9 rounded-2xl border border-zinc-300 dark:border-white/10 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-white/5 transition">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span>На главную</span>
        </Link>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl p-10 shadow-xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-semibold mb-2 text-black dark:text-white">
              {isLogin ? 'Вход' : 'Регистрация'}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-500">
              {isLogin 
                ? 'Войдите в свой аккаунт' 
                : 'Создайте новый аккаунт'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 dark:text-red-400 p-4 rounded-2xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500 transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 text-sm mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500 transition"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-zinc-600 dark:text-zinc-400 text-sm mb-2">Никнейм (необязательно)</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-500 transition"
                  placeholder="Как вас называть?"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-70 text-black font-medium py-4 rounded-2xl text-lg transition mt-4"
            >
              {loading 
                ? 'Подождите...' 
                : isLogin 
                  ? 'Войти' 
                  : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="text-center mt-8">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition font-medium"
            >
              {isLogin 
                ? 'Нет аккаунта? Зарегистрироваться' 
                : 'Уже есть аккаунт? Войти'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}