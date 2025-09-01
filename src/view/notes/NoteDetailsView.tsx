import { useState } from "react";
import { AddWordForm } from "../../components/AddWordForm";
import { useAppStore } from "../../store/store";
import {
  AMERICAN_PURPLE,
  MOONSTONE,
  PLUM,
  SOFT_PLUM,
  SOFT_SOFT_PLUM,
} from "../../styles/colors";

export function NoteDetailView({ noteId }: { noteId: string }) {
  const { notes, selectNote } = useAppStore();
  const note = notes.find((n) => n.id === noteId);

  const [query, setQuery] = useState("");

  const filtered = note?.vocab.filter(
    (w) =>
      w.original.toLowerCase().includes(query.toLowerCase()) ||
      w.english.toLowerCase().includes(query.toLowerCase())
  );

  if (!note) return <p>Note not found.</p>;

  return (
    <section className="space-y">
      <h2
        className="text-4xl font-bold pb-3 border-b-4 mb-3 mt-10 px-6"
        style={{ borderColor: `${PLUM}` }}
      >
        {note.title}
      </h2>
      <button
        className="my-2 text-white mx-6 px-4 bg-white hover:bg-gray-100  font-semibold py-2 border border-gray-400 rounded-lg shadow"
        style={{
          background: `${AMERICAN_PURPLE}`,
          border: `${PLUM}`,
        }}
        onClick={() => selectNote(undefined)}
      >
        Back
      </button>
      <div className="px-6 mt-2 flex flex-col gap-4">
        <AddWordForm noteId={note.id} />
        <div
          className="p-4 rounded-lg border-4"
          style={{
            backgroundColor: `${SOFT_PLUM}`,
            borderColor: `${MOONSTONE}`,
          }}
        >
          <input
            className="p-2 w-full rounded-lg color-black"
            placeholder="Search word…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {filtered?.map((w) => (
          <div
            key={w.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="flex flex-wrap gap-2 items-center"
              style={{
                color: `${AMERICAN_PURPLE}`,
              }}
            >
              <span className="text-lg font-semibold text-gray-800">
                {w.original}
              </span>
              <span
                style={{
                  backgroundColor: `${SOFT_SOFT_PLUM}`,
                  color: `${AMERICAN_PURPLE}`,
                }}
                className="  text-sm font-medium px-2 py-1 rounded-full"
              >
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
