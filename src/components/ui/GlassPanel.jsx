export default function GlassPanel({ children, className = "", hover = true }) {
  return (
    <div
      className={`glass rounded-2xl ${
        hover ? "transition-all duration-300 hover:border-gold/40 hover:shadow-gold-sm" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
