// AddWordForm.tsx
import { useState } from "react";
import { useAppStore } from "../store/store";

export function AddWordForm({ noteId }: { noteId: string }) {
  const { addWord } = useAppStore();

  const [original, setOriginal] = useState("");
  const [english, setEnglish] = useState("");
  const [description, setDescription] = useState("");
  const [examples, setExamples] = useState("");

  const handleAdd = () => {
    if (!original || !english) return;
    addWord(noteId, {
      id: crypto.randomUUID(),
      original,
      english,
      description: description || undefined,
      examples: examples ? examples.split(";").map((e) => e.trim()) : undefined,
    });
    // limpiar
    setOriginal("");
    setEnglish("");
    setDescription("");
    setExamples("");
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-1">
        <input
          className="color-black flex-1 min-w-[200px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Palabra original"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
        />
        <input
          className="color-black flex-1 min-w-[200px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Traducción al inglés"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />
        <textarea
          className="color-black flex-1 min-w-[200px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="color-black flex-1 min-w-[200px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ejemplos separados por ';'"
          value={examples}
          onChange={(e) => setExamples(e.target.value)}
        />
      </div>

      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-4"
        onClick={handleAdd}
      >
        ➕ Añadir palabra
      </button>
    </>
  );
}
