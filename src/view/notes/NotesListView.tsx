import { useState } from "react";
import { useAppStore } from "../../store/store";
import {
  IGUANA_GREEN,
  MOONSTONE,
  PLUM,
  SPACE_CADET,
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
    <section className="space-y">
      <h2
        className="text-4xl font-bold pb-3 border-b-2 mb-3 mt-10"
        style={{ borderColor: `${PLUM}` }}
      >
        Notes
      </h2>

      <div className="row gap-[12px] items-center w-full py-4">
        {!creating && (
          <button
            className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow"
            style={{ background: `${MOONSTONE}`, border: `${IGUANA_GREEN}` }}
            onClick={() => setCreating(true)}
          >
            Nueva nota
          </button>
        )}

        {creating && (
          <div className="flex row gap-4">
            <input
              className="p-3 rounded-full text-black"
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
            <button
              className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-5 border border-gray-400 rounded-full shadow"
              style={{ background: `${MOONSTONE}`, border: `${IGUANA_GREEN}` }}
              onClick={handleCreate}
            >
              Añadir
            </button>
            <button
              className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-5 border border-gray-400 rounded-full shadow"
              style={{ background: `${MOONSTONE}`, border: `${IGUANA_GREEN}` }}
              onClick={() => setCreating(false)}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => selectNote(note.id)}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {note.title}
            </h2>
            <p className="text-gray-500 text-sm">
              {note.vocab.length} palabras
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
