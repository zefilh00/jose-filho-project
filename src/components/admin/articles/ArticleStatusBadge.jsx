export default function ArticleStatusBadge({ status }) {
  const published = status === "published";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
        published
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
          : "border-amber-500/20 bg-amber-500/10 text-amber-300"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          published ? "bg-emerald-400" : "bg-amber-400"
        }`}
      />

      {published ? "Publicado" : "Rascunho"}
    </span>
  );
}