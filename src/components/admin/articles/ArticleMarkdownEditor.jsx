import { useRef, useState } from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link,
  Table,
  ImagePlus,
  Eye,
  PenLine,
  LoaderCircle,
} from "lucide-react";
import ArticlePreview from "./ArticlePreview";

const toolbar = [
  { label: "Título 1", icon: Heading1, value: "# ", line: true },
  { label: "Título 2", icon: Heading2, value: "## ", line: true },
  { label: "Negrito", icon: Bold, value: "**texto**" },
  { label: "Itálico", icon: Italic, value: "*texto*" },
  { label: "Lista", icon: List, value: "- ", line: true },
  {
    label: "Lista numerada",
    icon: ListOrdered,
    value: "1. ",
    line: true,
  },
  { label: "Citação", icon: Quote, value: "> ", line: true },
];

export default function ArticleMarkdownEditor({
  value,
  onChange,
  onUploadImage,
  previewData,
}) {
  const textareaRef = useRef(null);
  const imageInputRef = useRef(null);
  const [mode, setMode] = useState("write");
  const [uploading, setUploading] = useState(false);

  function insertText(text, line = false) {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.slice(start, end);
    const insertion = line
      ? `${text}${selectedText}`
      : text.replace("texto", selectedText || "texto");

    const nextValue =
      value.slice(0, start) +
      insertion +
      value.slice(end);

    onChange(nextValue);

    requestAnimationFrame(() => {
      textarea.focus();

      const cursorPosition =
        start + insertion.length;

      textarea.setSelectionRange(
        cursorPosition,
        cursorPosition
      );
    });
  }

  function insertLink() {
    const url = window.prompt("Cole o endereço do link:");

    if (!url) return;

    const textarea = textareaRef.current;
    const selectedText = textarea
      ? value.slice(textarea.selectionStart, textarea.selectionEnd)
      : "";

    const label = selectedText || "texto do link";

    insertText(`[${label}](${url})`);
  }

  function insertTable() {
    insertText(
      "| Coluna 1 | Coluna 2 |\n| --- | --- |\n| Conteúdo | Conteúdo |\n",
      true
    );
  }

  async function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const image = await onUploadImage(file);
      insertText(`![${file.name}](${image.url})`, true);
    } catch (error) {
      window.alert(
        error.message || "Não foi possível enviar a imagem."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101426]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-3">
        <div className="flex flex-wrap items-center gap-1">
          {toolbar.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                title={item.label}
                onClick={() =>
                  insertText(item.value, item.line)
                }
                disabled={mode !== "write"}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
              >
                <Icon size={18} />
              </button>
            );
          })}

          <div className="mx-1 h-6 w-px bg-white/10" />

          <button
            type="button"
            title="Inserir link"
            onClick={insertLink}
            disabled={mode !== "write"}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
          >
            <Link size={18} />
          </button>

          <button
            type="button"
            title="Inserir tabela"
            onClick={insertTable}
            disabled={mode !== "write"}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
          >
            <Table size={18} />
          </button>

          <button
            type="button"
            title="Inserir imagem"
            onClick={() => imageInputRef.current?.click()}
            disabled={uploading || mode !== "write"}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
          >
            {uploading ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              <ImagePlus size={18} />
            )}
          </button>

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-[#080b18] p-1">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition ${
              mode === "write"
                ? "bg-violet-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <PenLine size={14} />
            Escrever
          </button>

          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition ${
              mode === "preview"
                ? "bg-violet-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Eye size={14} />
            Visualizar
          </button>
        </div>
      </div>

      {mode === "write" ? (
        <div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Comece a escrever seu artigo aqui..."
            spellCheck="true"
            className="min-h-[550px] w-full resize-y bg-transparent p-6 font-mono text-sm leading-7 text-slate-200 outline-none placeholder:text-slate-600"
          />

          <div className="border-t border-white/[0.06] px-6 py-3 text-xs text-slate-500">
            Markdown habilitado. Você pode utilizar títulos, listas,
            tabelas, links, imagens e formatação de texto.
          </div>
        </div>
      ) : (
        <div className="min-h-[550px] p-6">
          <ArticlePreview
            {...previewData}
            content={value}
          />
        </div>
      )}
    </div>
  );
}