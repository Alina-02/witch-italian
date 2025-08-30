import { useState } from "react";
import { AddWordForm } from "../../components/AddWordForm";
import { useAppStore } from "../../store/store";

export function NoteDetailView({ noteId }: { noteId: string }) {
  const { notes, selectNote } = useAppStore();
  const note = notes.find((n) => n.id === noteId);

  const [query, setQuery] = useState("");

  const filtered = note?.vocab.filter(
    (w) =>
      w.original.toLowerCase().includes(query.toLowerCase()) ||
      w.english.toLowerCase().includes(query.toLowerCase())
  );

  if (!note) return <p>Nota no encontrada</p>;

  return (
    <section className="space-y">
      <h2 className="text-4xl font-bold pb-3 border-b-2 mb-3">{note.title}</h2>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => selectNote(undefined)}
      >
        ⬅️ Volver
      </button>
      <div className="mt-4 flex flex-col gap-4">
        <AddWordForm noteId={note.id} />

        <input
          className="p-2 w-full rounded-lg"
          placeholder="Buscar palabra…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {filtered?.map((w) => (
          <div
            key={w.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Fila con palabra y traducción */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-lg font-semibold text-gray-800">
                {w.original}
              </span>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                {w.english}
              </span>
            </div>

            {w.description && (
              <p className="text-gray-500 mt-2 text-sm">{w.description}</p>
            )}

            {w.examples?.length ? (
              <ul className="list-disc list-inside mt-2 ml-4 text-gray-600 text-sm">
                {w.examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
