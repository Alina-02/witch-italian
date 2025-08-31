import { useMemo, useState } from "react";
import { useAppStore } from "../store/store";
import { PLUM } from "../styles/colors";

export function DictionaryView() {
  const { notes } = useAppStore();
  const [query, setQuery] = useState("");

  const allWords = useMemo(() => notes.flatMap((n) => n.vocab), [notes]);
  const filtered = allWords.filter(
    (w) =>
      w.original.toLowerCase().includes(query.toLowerCase()) ||
      w.english.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="space-y">
      <h2
        className="text-4xl font-bold pb-3 border-b-2 mb-3 mt-10"
        style={{ borderColor: `${PLUM}` }}
      >
        Dictionary
      </h2>

      <div className="flex flex-row gap-2 items-center justify-center py-4">
        <input
          className="px-4 py-2 rounded-full color-black"
          placeholder="Buscar palabra…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span>{filtered.length} resultados</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filtered.map((w) => (
          <div
            key={w.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-wrap gap-2 items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800 m-0">
                {w.original}
              </h3>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                {w.english}
              </span>
            </div>

            {w.description && (
              <p className="text-gray-500 text-sm mb-2">{w.description}</p>
            )}

            {w.examples?.length ? (
              <ul className="list-disc list-inside text-gray-600 text-sm ml-2">
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
