import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function MagazineForm({ magazine, onSuccess }) {
  const [form, setForm] = useState({
    title: '',
    category: '',
    issue: '',
    description: '',
    long_description: '',
    pdf_url: '',
    cover: '',
    rating: 0,
  });

  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);

  // Загрузка данных при редактировании
  useEffect(() => {
    if (magazine) {
      setForm({
        ...magazine,
        rating: Number(magazine.rating) || 0,
      });
    }
  }, [magazine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ 
      ...form, 
      [name]: name === 'rating' ? Number(value) || 0 : value 
    });
  };

  // Универсальная загрузка файлов
  async function uploadFile(file, folder) {
    if (!file) return null;
    
    const fileName = `${folder}/${Date.now()}-${file.name}`;
    
    const { error } = await supabase.storage
      .from('covers')
      .upload(fileName, file);

    if (error) {
      console.error(error);
      return null;
    }

    const { data } = supabase.storage
      .from('covers')
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadFile(image, 'images');
    const uploadedPdfUrl = await uploadFile(pdf, 'pdfs');

    const newData = {
      ...form,
      cover: imageUrl || form.cover,
      // Приоритет: если загрузили файл — используем его, иначе оставляем то, что в поле
      pdf_url: uploadedPdfUrl || form.pdf_url,
      rating: Number(form.rating) || 0,
    };

    if (magazine) {
      const { error } = await supabase
        .from('magazines')
        .update(newData)
        .eq('id', magazine.id);
      if (error) console.error(error);
    } else {
      const { error } = await supabase
        .from('magazines')
        .insert([newData]);
      if (error) console.error(error);
    }

    onSuccess();

    // Очистка формы
    setForm({
      title: '',
      category: '',
      issue: '',
      description: '',
      long_description: '',
      pdf_url: '',
      cover: '',
      rating: 0,
    });
    setImage(null);
    setPdf(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-6 rounded-3xl">
      <h2 className="text-2xl font-bold">
        {magazine ? 'Редактировать' : 'Добавить'} журнал
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Название журнала"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-2xl bg-zinc-800"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="category"
          placeholder="Категория"
          value={form.category}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl bg-zinc-800"
        />
        <input
          type="text"
          name="issue"
          placeholder="Выпуск / Дата"
          value={form.issue}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl bg-zinc-800"
        />
      </div>

      <textarea
        name="description"
        placeholder="Краткое описание"
        value={form.description}
        onChange={handleChange}
        rows={3}
        className="w-full p-4 rounded-2xl bg-zinc-800"
      />

      <textarea
        name="long_description"
        placeholder="Полное описание"
        value={form.long_description}
        onChange={handleChange}
        rows={5}
        className="w-full p-4 rounded-2xl bg-zinc-800"
      />

      {/* ⭐ Оценка */}
      <div>
        <label className="block text-sm text-zinc-400 mb-2">
          Начальная оценка (0–5)
        </label>
        <input
          type="number"
          name="rating"
          min="0"
          max="5"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl bg-zinc-800 text-2xl"
        />
        <p className="text-xs text-zinc-500 mt-1">
          Можно оставить 0 — пользователи потом поставят свою оценку
        </p>
      </div>

      {/* Обложка */}
      <div>
        <label className="block text-sm text-zinc-400 mb-2">Обложка</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-4 rounded-2xl bg-zinc-800 file:mr-4 file:py-2 file:px-6 file:rounded-xl file:border-0 file:bg-amber-500 file:text-black"
        />
      </div>

      {/* PDF Файл */}
      <div>
        <label className="block text-sm text-zinc-400 mb-2">PDF файл</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          className="w-full p-4 rounded-2xl bg-zinc-800 file:mr-4 file:py-2 file:px-6 file:rounded-xl file:border-0 file:bg-amber-500 file:text-black"
        />
      </div>

      {/* ← Новое поле: Прямая ссылка на PDF */}
      <div>
        <label className="block text-sm text-zinc-400 mb-2">
          Или прямая ссылка на PDF (pdf_url)
        </label>
        <input
          type="url"
          name="pdf_url"
          placeholder="https://example.com/files/magazine.pdf"
          value={form.pdf_url}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl bg-zinc-800"
        />
        <p className="text-xs text-zinc-500 mt-1">
          Если загрузишь файл выше — он будет иметь приоритет. 
          Это поле можно использовать для внешних ссылок.
        </p>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-amber-500 text-black font-semibold rounded-2xl hover:bg-amber-400 transition"
      >
        {magazine ? 'Сохранить изменения' : 'Добавить журнал'}
      </button>
    </form>
  );
}