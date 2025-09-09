// AddWordForm.tsx
import { useEffect, useState } from "react";
import { useAppStore } from "../store/store";
import { AMERICAN_PURPLE, MOONSTONE, PLUM, SOFT_PLUM } from "../styles/colors";

export function AddWordForm({ noteId }: { noteId: string }) {
  const { addWord, editWord, selectedWordToEdit, selectWordToEdit } =
    useAppStore();

  const [original, setOriginal] = useState("");
  const [english, setEnglish] = useState("");
  const [description, setDescription] = useState("");
  const [examples, setExamples] = useState("");

  const handleSubmit = () => {
    if (!original.trim() || !english.trim()) return;

    if (selectedWordToEdit) {
      editWord(noteId, selectedWordToEdit.id, {
        original,
        english,
        description: description || undefined,
        examples: examples
          ? examples.split(";").map((e) => e.trim())
          : undefined,
      });
      selectWordToEdit(undefined);
    } else {
      addWord(noteId, {
        id: crypto.randomUUID(),
        original,
        english,
        description: description || undefined,
        examples: examples
          ? examples.split(";").map((e) => e.trim())
          : undefined,
      });
    }

    setOriginal("");
    setEnglish("");
    setDescription("");
    setExamples("");
  };

  useEffect(() => {
    if (selectedWordToEdit) {
      setOriginal(selectedWordToEdit.original);
      setEnglish(selectedWordToEdit.english);
      setDescription(selectedWordToEdit.description || "");
      setExamples(selectedWordToEdit.examples?.join("; ") || "");
    } else {
      setOriginal("");
      setEnglish("");
      setDescription("");
      setExamples("");
    }
  }, [selectedWordToEdit]);

  return (
    <div
      className="rounded-lg flex flex-col gap-4 p-4 border-4"
      style={{
        backgroundColor: `${SOFT_PLUM}`,
        borderColor: `${MOONSTONE}`,
      }}
    >
      <div className="flex flex-wrap gap-3 mb-1">
        <input
          className="rounded-lg shadow color-black flex-1 min-w-[200px] p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#36aebc]"
          style={{
            border: `${AMERICAN_PURPLE}`,
          }}
          placeholder="Italian word"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
        />
        <input
          className="rounded-lg shadow color-black flex-1 min-w-[200px] p-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#36aebc]"
          style={{
            border: `${AMERICAN_PURPLE}`,
          }}
          placeholder="English word"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />
        <input
          className="shadow color-black flex-1 min-w-[200px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36aebc] resize-y"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="rounded-lg shadow color-black flex-1 min-w-[200px] p-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#36aebc]"
          style={{
            border: `${AMERICAN_PURPLE}`,
          }}
          placeholder="Examples divided by ';'"
          value={examples}
          onChange={(e) => setExamples(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        {selectedWordToEdit && (
          <button
            className="bg-white hover:bg-gray-100 w-full font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
            onClick={() => selectWordToEdit(undefined)}
          >
            Cancel
          </button>
        )}
        <button
          className="text-white hover:bg-gray-100 w-full font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
          style={{
            background: `${AMERICAN_PURPLE}`,
            border: `${PLUM}`,
          }}
          onClick={handleSubmit}
        >
          {selectedWordToEdit ? "Update word" : "Add word"}
        </button>
      </div>
    </div>
  );
}
