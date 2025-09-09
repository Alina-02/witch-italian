import { useState } from "react";
import { AddWordForm } from "../../components/AddWordForm";
import { useAppStore } from "../../store/store";
import {
  AMERICAN_PURPLE,
  MOONSTONE,
  PLUM,
  SOFT_PLUM,
} from "../../styles/colors";
import WordCard from "../../components/WordCard";

export function NoteDetailView({ noteId }: { noteId: string }) {
  const { notes, selectNote } = useAppStore();
  const note = notes.find((n) => n.id === noteId);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [query, setQuery] = useState("");

  const filtered = note?.vocab.filter(
    (w) =>
      w.original.toLowerCase().includes(query.toLowerCase()) ||
      w.english.toLowerCase().includes(query.toLowerCase())
  );

  if (!note) return <p>Note not found.</p>;

  return (
    <div className="flex flex-col h-screen">
      <div
        style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
        className="border-l-4 border-t-8 border-b-8 border-r-8 min-h-[147px]"
      >
        <div className="bg-white rounded-lg flex items-center justify-center w-full h-full">
          <h2
            className="font-caveat text-6xl font-bold"
            style={{ borderColor: `${PLUM}` }}
          >
            {note.title}
          </h2>
        </div>
      </div>
      <div
        id="notes-div"
        style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
        className="border-l-4 border-t-4 border-b-8 border-r-8 flex-grow "
      >
        <div className="bg-white rounded-lg flex flex-col w-full pt-3">
          <button
            className="w-32 my-2 text-white mx-6 px-4 bg-white hover:bg-gray-100  font-semibold py-2 border border-gray-400 rounded-lg shadow"
            style={{
              background: `${AMERICAN_PURPLE}`,
              border: `${PLUM}`,
            }}
            onClick={() => selectNote(undefined)}
          >
            Back
          </button>
          <div className="px-6 mt-2 flex flex-col gap-4 flex-grow">
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
            <div
              style={{ height: "calc(100vh - 498px)" }}
              className="flex flex-col gap-4 flex-grow overflow-y-auto pr-2 scrollbar-custom mb-2"
            >
              {filtered?.map((w) => (
                <WordCard word={w} note={note} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
