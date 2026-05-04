export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-black dark:text-white">
      {children}
    </div>
  );
}