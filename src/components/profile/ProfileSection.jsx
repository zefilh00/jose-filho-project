export default function ProfileSection({
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-xl shadow-black/10 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
