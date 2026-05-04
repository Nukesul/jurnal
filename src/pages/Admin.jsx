import { useState } from 'react';
import AdminLayout from '../admin/AdminLayout';
import MagazineList from '../admin/MagazineList';
import MagazineForm from '../admin/MagazineForm';

export default function Admin() {
  const [editingMagazine, setEditingMagazine] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setEditingMagazine(null);
    setRefresh(prev => prev + 1);
  };

  const handleCancelEdit = () => {
    setEditingMagazine(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* 🔥 Заголовок */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Админ-панель</h1>

          {editingMagazine && (
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-zinc-700 text-white rounded-xl"
            >
              Отмена
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* 📝 Форма */}
          <div>
            <MagazineForm 
              magazine={editingMagazine} 
              onSuccess={handleSuccess} 
            />
          </div>

          {/* 📚 Список */}
          <div className="lg:col-span-2">
            <MagazineList 
              key={refresh} 
              onEdit={setEditingMagazine} 
            />
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}