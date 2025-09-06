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
    <div className="flex flex-col h-screen">
      <div
        style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
        className="border-l-4 border-t-8 border-b-8 border-r-8 min-h-[147px]"
      >
        <div className="bg-white rounded-lg flex items-center justify-center w-full h-full ">
          <h2
            className="font-caveat text-6xl font-bold bg-clip-text text-transparent bg-cover bg-center"
            style={{
              color: `${AMERICAN_PURPLE}`,
            }}
          >
            NOTES
          </h2>
        </div>
      </div>
      <div
        id="notes-div"
        style={{ borderColor: `${PLUM}`, backgroundColor: `${PLUM}` }}
        className="border-l-4 border-t-4 border-b-8 border-r-8 flex-grow "
      >
        <div className="bg-white rounded-lg flex flex-col w-full h-full pt-3 overflow-y-auto pr-2 scrollbar-custom mb-2">
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
                <p className="text-gray-500 text-sm">
                  {note.vocab.length} words
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
