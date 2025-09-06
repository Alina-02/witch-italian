import { useMemo, useState } from "react";
import { useAppStore } from "../store/store";
import {
  AMERICAN_PURPLE,
  MOONSTONE,
  PLUM,
  SOFT_PLUM,
  SOFT_SOFT_PLUM,
} from "../styles/colors";

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
    <div className="flex flex-col h-screen">
      <div
        style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
        className="border-l-4 border-t-8 border-b-8 border-r-8 min-h-[147px]"
      >
        <div className="bg-white rounded-lg flex items-center justify-center w-full h-full">
          <h2
            className="font-caveat text-6xl font-bold "
            style={{ borderColor: `${PLUM}` }}
          >
            Dictionary
          </h2>
        </div>
      </div>

      <div
        id="notes-div"
        style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
        className="border-l-4 border-t-4 border-b-8 border-r-8 flex-grow"
      >
        <div className="bg-white rounded-lg flex flex-col w-full h-full pt-3">
          <div
            className="p-4 mt-3 rounded-lg border-4 mx-6 flex flex-row gap-4 items-center"
            style={{
              backgroundColor: `${SOFT_PLUM}`,
              borderColor: `${MOONSTONE}`,
            }}
          >
            <input
              className="px-4 py-2 rounded-lg color-black w-full"
              placeholder="Search word…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="text-center">{filtered.length} words</span>
          </div>

          <div className="mx-6 my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {filtered.map((w) => (
              <div
                key={w.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 m-0">
                    {w.original}
                  </h3>
                  <span
                    style={{
                      backgroundColor: `${SOFT_SOFT_PLUM}`,
                      color: `${AMERICAN_PURPLE}`,
                    }}
                    className=" text-sm font-medium px-2 py-1 rounded-full"
                  >
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
        </div>
      </div>
    </div>
  );
}
