import { useState } from "react";
import { useAppStore } from "../../store/store";
import {
  AMERICAN_PURPLE,
  MOONSTONE,
  PLUM,
  SOFT_PLUM,
} from "../../styles/colors";

export function NotesListView() {
  const { notes, addNote, selectNote } = useAppStore();
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    addNote(newTitle.trim());
    setNewTitle("");
    setCreating(false);
  };

  return (
    <section className="w-full">
      <h2
        className="text-4xl font-bold pb-3 border-b-4 mb-3 mt-10 px-6"
        style={{ borderColor: `${PLUM}` }}
      >
        Notes
      </h2>

      <div className="row gap-[12px] items-center w-full py-2 px-6">
        {!creating && (
          <button
            className="text-white hover:bg-gray-100 w-full font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
            style={{
              background: `${AMERICAN_PURPLE}`,
              border: `${PLUM}`,
            }}
            onClick={() => setCreating(true)}
          >
            New note
          </button>
        )}

        {creating && (
          <div
            className="flex flex-col gap-4 rounded-lg p-4 border-4"
            style={{
              backgroundColor: `${SOFT_PLUM}`,
              borderColor: `${MOONSTONE}`,
            }}
          >
            <input
              className="p-3 rounded-lg shadow text-black "
              style={{
                border: `${AMERICAN_PURPLE}`,
              }}
              placeholder="Título de la nota"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
                if (e.key === "Escape") {
                  setCreating(false);
                  setNewTitle("");
                }
              }}
              autoFocus
            />
            <div className="flex flex-row gap-4">
              <button
                className="bg-white hover:bg-gray-100 w-full font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
                style={{
                  color: `${AMERICAN_PURPLE}`,
                  border: `${PLUM}`,
                }}
                onClick={() => setCreating(false)}
              >
                Cancel
              </button>
              <button
                className="text-white hover:bg-gray-100 w-full font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
                style={{
                  background: `${AMERICAN_PURPLE}`,
                  border: `${PLUM}`,
                }}
                onClick={handleCreate}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            style={{ color: `${AMERICAN_PURPLE}` }}
            onClick={() => selectNote(note.id)}
          >
            <h2 className="text-lg font-semibold mb-1">{note.title}</h2>
            <p className="text-gray-500 text-sm">{note.vocab.length} words</p>
          </div>
        ))}
      </div>
    </section>
  );
}
